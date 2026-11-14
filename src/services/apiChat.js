import supabase from "./supabase";
import { executeChatWithFallback } from "./apiAI";
import { format, subDays } from "date-fns";

/**
 * Fetch fresh hotel operational data to ground the AI responses in real data.
 */
async function fetchHotelContext() {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  const [
    { data: cabins },
    { data: allBookings },
    { data: todayActivity },
    { data: settings },
    { data: recentBookings },
    { data: guests },
  ] = await Promise.all([
    supabase.from("cabins").select("*"),
    supabase
      .from("bookings")
      .select("*, cabins(name, regularPrice, maxCapacity), guests(fullName, email, nationality)")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("bookings")
      .select("*, guests(fullName, nationality, countryFlag)")
      .or(
        `and(status.eq.unconfirmed,startDate.eq.${todayStr}),and(status.eq.checked-in,endDate.eq.${todayStr})`
      ),
    supabase.from("settings").select("*").single(),
    supabase
      .from("bookings")
      .select("*, cabins(name), guests(fullName)")
      .gte("created_at", subDays(today, 30).toISOString()),
    supabase.from("guests").select("*").limit(50),
  ]);

  const checkedIn = allBookings?.filter((b) => b.status === "checked-in") || [];
  const checkedOut = allBookings?.filter((b) => b.status === "checked-out") || [];
  const unconfirmed = allBookings?.filter((b) => b.status === "unconfirmed") || [];

  const totalRevenue =
    checkedOut.reduce((sum, b) => sum + (b.totalPrice || 0), 0) +
    checkedIn.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const occupancyRate = cabins?.length
    ? ((checkedIn.length / cabins.length) * 100).toFixed(1)
    : 0;

  return {
    today: todayStr,
    cabins: cabins || [],
    totalCabins: cabins?.length || 0,
    bookings: allBookings || [],
    todayArrivals: todayActivity?.filter((b) => b.status === "unconfirmed") || [],
    todayDepartures: todayActivity?.filter((b) => b.status === "checked-in") || [],
    currentlyCheckedIn: checkedIn,
    recentBookings: recentBookings || [],
    unconfirmedBookings: unconfirmed,
    settings: settings || {},
    guests: guests || [],
    stats: {
      totalBookings: allBookings?.length || 0,
      checkedInCount: checkedIn.length,
      checkedOutCount: checkedOut.length,
      unconfirmedCount: unconfirmed.length,
      totalRevenue,
      occupancyRate,
    },
  };
}

/**
 * Send a chat message and get an AI response grounded in Supabase data.
 * @param {string} userMessage - User's query
 * @param {Array} chatHistory - Previous message objects: [{ role: "user" | "assistant", text: string }]
 */
export async function sendChatMessage(userMessage, chatHistory = []) {
  const context = await fetchHotelContext();

  const systemPrompt = `You are an AI Operations Assistant for "The Wild Oasis" luxury boutique hotel. You assist hotel staff with bookings, cabin availability, guest inquiries, revenue, and daily tasks.

TODAY'S SYSTEM DATE: ${context.today}

HOTEL SUMMARY STATS:
- Total Cabins: ${context.totalCabins}
- Current Occupancy Rate: ${context.stats.occupancyRate}%
- Active Stays (Checked-In): ${context.stats.checkedInCount}
- Pending/Unconfirmed Bookings: ${context.stats.unconfirmedCount}
- Past Checked-Out Bookings: ${context.stats.checkedOutCount}
- Total Revenue: $${context.stats.totalRevenue.toLocaleString()}

CABINS INVENTORY:
${JSON.stringify(
  context.cabins.map((c) => ({
    name: c.name,
    capacity: c.maxCapacity,
    regularPrice: c.regularPrice,
    discount: c.discount,
  }))
)}

TODAY'S ACTIVITY:
- Arrivals Today (unconfirmed bookings starting today): ${context.todayArrivals.length}
  ${JSON.stringify(
    context.todayArrivals.map((b) => ({
      guest: b.guests?.fullName,
      stayLengthNights: b.numNights,
    }))
  )}
- Departures Today (checked-in guests departing today): ${context.todayDepartures.length}
  ${JSON.stringify(
    context.todayDepartures.map((b) => ({
      guest: b.guests?.fullName,
    }))
  )}

RECENT BOOKINGS SAMPLE:
${JSON.stringify(
  context.bookings.slice(0, 30).map((b) => ({
    id: b.id,
    guest: b.guests?.fullName,
    cabin: b.cabins?.name,
    status: b.status,
    startDate: b.startDate?.slice(0, 10),
    endDate: b.endDate?.slice(0, 10),
    totalPrice: b.totalPrice,
    isPaid: b.isPaid,
  }))
)}

SETTINGS:
- Breakfast Price: $${context.settings.breakfastPrice || 15}
- Min Booking Nights: ${context.settings.minBookingLength || 3}
- Max Booking Nights: ${context.settings.maxBookingLength || 30}

GUIDELINES:
- Provide accurate, concise, and helpful answers based strictly on the data above.
- Always format currency values with a dollar sign (e.g., $150).
- If listing multiple items, use bullet points.
- If data is not available, mention it clearly rather than guessing.
- Keep responses friendly, professional, and under 150 words.`;

  const formattedHistory = chatHistory.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  return await executeChatWithFallback(systemPrompt, formattedHistory, userMessage);
}
