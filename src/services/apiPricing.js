import supabase from "./supabase";
import { generateContentWithFallback } from "./apiAI";
import { subMonths, getDay, parseISO } from "date-fns";

/**
 * Fetch historical booking analytics per cabin from Supabase
 */
async function fetchCabinAnalytics() {
  const today = new Date();
  const threeMonthsAgo = subMonths(today, 3);

  const [{ data: cabins }, { data: bookings }] = await Promise.all([
    supabase.from("cabins").select("*").order("name"),
    supabase
      .from("bookings")
      .select("*, cabins(name)")
      .gte("startDate", threeMonthsAgo.toISOString())
      .order("startDate"),
  ]);

  if (!cabins) return null;

  const validBookings = bookings || [];

  const cabinAnalytics = cabins.map((cabin) => {
    const cabinBookings = validBookings.filter((b) => b.cabinId === cabin.id);
    const totalBookings = cabinBookings.length;
    const totalRevenue = cabinBookings.reduce(
      (sum, b) => sum + (b.totalPrice || b.cabinPrice || 0),
      0
    );
    const totalNights = cabinBookings.reduce(
      (sum, b) => sum + (b.numNights || 0),
      0
    );
    const avgNightsPerBooking =
      totalBookings > 0 ? Number((totalNights / totalBookings).toFixed(1)) : 0;

    // Estimated 90-day occupancy
    const occupancyRate = Number(
      Math.min(100, (totalNights / 90) * 100).toFixed(1)
    );

    let weekendBookings = 0;
    let weekdayBookings = 0;
    cabinBookings.forEach((b) => {
      try {
        const day = getDay(parseISO(b.startDate));
        if (day === 0 || day === 5 || day === 6) weekendBookings++;
        else weekdayBookings++;
      } catch (e) {
        weekdayBookings++;
      }
    });

    const avgRevenuePerNight =
      totalNights > 0 ? Math.round(totalRevenue / totalNights) : cabin.regularPrice;

    const breakfastRate =
      totalBookings > 0
        ? Math.round(
            (cabinBookings.filter((b) => b.hasBreakfast).length / totalBookings) *
              100
          )
        : 0;

    return {
      cabinId: cabin.id,
      name: cabin.name,
      image: cabin.image,
      currentPrice: cabin.regularPrice,
      currentDiscount: cabin.discount,
      maxCapacity: cabin.maxCapacity,
      totalBookings,
      totalRevenue,
      totalNights,
      avgNightsPerBooking,
      occupancyRate,
      weekendBookings,
      weekdayBookings,
      avgRevenuePerNight,
      breakfastRate,
    };
  });

  return cabinAnalytics;
}

/**
 * Clean and parse JSON response from Gemini
 */
function parseGeminiJSON(responseText) {
  let cleaned = responseText.trim();
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);

  cleaned = cleaned.trim();

  // Try finding array bracket if surrounded by commentary
  const startIdx = cleaned.indexOf("[");
  const endIdx = cleaned.lastIndexOf("]");
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  return JSON.parse(cleaned);
}

/**
 * Deterministic fallback suggestion calculation if AI service is temporarily unavailable
 */
function calculateLocalSuggestions(analytics) {
  return analytics.map((c) => {
    let changePercent = 0;
    let reasoning = "Balanced demand; pricing remains optimal.";
    const factors = [];

    if (c.occupancyRate >= 70) {
      changePercent = 12;
      reasoning = `High occupancy (${c.occupancyRate}%) indicates strong demand. Price increase suggested.`;
      factors.push("Occupancy exceeds 70%", "Strong weekend booking rate");
    } else if (c.occupancyRate < 35) {
      changePercent = -10;
      reasoning = `Low occupancy (${c.occupancyRate}%) suggests lowering rates to stimulate bookings.`;
      factors.push("Occupancy under 35%", "Weekday vacancy buffer");
    } else {
      changePercent = 3;
      factors.push("Stable reservation velocity", "Consistent length of stay");
    }

    const rawSuggested = Math.round(c.currentPrice * (1 + changePercent / 100));
    const suggestedPrice = Math.round(rawSuggested / 5) * 5;

    return {
      cabinId: c.cabinId,
      cabinName: c.name,
      currentPrice: c.currentPrice,
      suggestedPrice,
      changePercent,
      confidence: c.totalBookings > 5 ? "high" : "medium",
      reasoning,
      factors,
    };
  });
}

/**
 * Get AI pricing suggestions for all cabins
 */
export async function getPricingSuggestions() {
  const analytics = await fetchCabinAnalytics();
  if (!analytics || analytics.length === 0) {
    throw new Error("Could not retrieve cabin performance metrics.");
  }

  const prompt = `You are a hotel revenue management AI specialist for luxury cabin resort "The Wild Oasis".
Analyze the 90-day performance data of our cabins and suggest dynamic price adjustments for each cabin.

CABIN ANALYTICS:
${JSON.stringify(analytics, null, 2)}

Provide a JSON array where each object has this EXACT structure:
[
  {
    "cabinId": <number>,
    "cabinName": "<string>",
    "currentPrice": <number>,
    "suggestedPrice": <number (rounded to nearest 5)>,
    "changePercent": <number (positive for increase, negative for decrease)>,
    "confidence": "high" | "medium" | "low",
    "reasoning": "<1-2 clear sentences explaining the rationale>",
    "factors": ["<short factor 1>", "<short factor 2>"]
  }
]

PRICING CRITERIA:
1. Occupancy > 70%: Recommend a 5% to 20% price increase.
2. Occupancy < 35%: Recommend a 5% to 15% discount to stimulate demand.
3. Occupancy between 35% and 70%: Recommend minor adjustment (-5% to +5%).
4. High weekend preference allows higher surge pricing.
5. High breakfast attach rate indicates guest willingness to spend.
6. Round all suggested prices to the nearest $5.
7. Output valid JSON only, without markdown wrapping or explanatory text.`;

  try {
    const responseText = await generateContentWithFallback(prompt);
    const suggestions = parseGeminiJSON(responseText);

    return {
      suggestions,
      analytics,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(
      "[Pricing Service] Failed to parse AI response. Using revenue heuristic fallback:",
      error.message
    );
    const fallbackSuggestions = calculateLocalSuggestions(analytics);
    return {
      suggestions: fallbackSuggestions,
      analytics,
      generatedAt: new Date().toISOString(),
      isFallback: true,
    };
  }
}
