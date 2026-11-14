/**
 * Demo Simulation Engine
 * =====================
 * Keeps the live demo alive by automatically managing booking data.
 *
 * Strategy:
 * 1. On dashboard load, checks if data is "fresh" (has bookings near today)
 * 2. If stale/empty, removes only auto-generated [AUTO-DEMO] bookings
 * 3. Preserves all user-created bookings
 * 4. Generates new demo bookings avoiding cabin date conflicts
 * 5. Ensures "Today's Activity" always has arrivals & departures
 * 6. Runs silently — no UI shown to the interviewer
 *
 * This runs ONLY when the data is stale. If the daily cron has already
 * refreshed the data, this does nothing.
 */

import { add, sub, differenceInDays, format } from "date-fns";
import supabase from "./supabase";

// ── Config ────────────────────────────────────────────────────────────
const SEED_LOCK_KEY = "wild_oasis_seed_lock";
const SEED_TIMESTAMP_KEY = "wild_oasis_last_seed";
const SEED_COOLDOWN_MS = 60 * 60 * 1000; // Don't re-seed more than once per hour

// ── Guest Pool ────────────────────────────────────────────────────────
const GUEST_POOL = [
  { fullName: "Arjun Mehta", email: "arjun.mehta@gmail.com", nationality: "India", nationalID: "8834521907", countryFlag: "https://flagcdn.com/in.svg" },
  { fullName: "Sophia Laurent", email: "sophia.l@outlook.com", nationality: "France", nationalID: "7723098145", countryFlag: "https://flagcdn.com/fr.svg" },
  { fullName: "James O'Brien", email: "james.obrien@gmail.com", nationality: "Ireland", nationalID: "5567890234", countryFlag: "https://flagcdn.com/ie.svg" },
  { fullName: "Yuki Tanaka", email: "yuki.tanaka@gmail.com", nationality: "Japan", nationalID: "3345678901", countryFlag: "https://flagcdn.com/jp.svg" },
  { fullName: "Elena Rossi", email: "elena.rossi@yahoo.com", nationality: "Italy", nationalID: "4456789012", countryFlag: "https://flagcdn.com/it.svg" },
  { fullName: "Marcus Johnson", email: "marcus.j@gmail.com", nationality: "United States", nationalID: "6678901234", countryFlag: "https://flagcdn.com/us.svg" },
  { fullName: "Priya Sharma", email: "priya.sharma@hotmail.com", nationality: "India", nationalID: "9945678123", countryFlag: "https://flagcdn.com/in.svg" },
  { fullName: "Lars Svensson", email: "lars.s@gmail.com", nationality: "Sweden", nationalID: "1123456789", countryFlag: "https://flagcdn.com/se.svg" },
  { fullName: "Amara Okafor", email: "amara.o@gmail.com", nationality: "Nigeria", nationalID: "2234567890", countryFlag: "https://flagcdn.com/ng.svg" },
  { fullName: "Chen Wei", email: "chen.wei@qq.com", nationality: "China", nationalID: "8890123456", countryFlag: "https://flagcdn.com/cn.svg" },
  { fullName: "Isabella Martinez", email: "isabella.m@gmail.com", nationality: "Spain", nationalID: "7701234567", countryFlag: "https://flagcdn.com/es.svg" },
  { fullName: "Oliver Schmidt", email: "oliver.s@web.de", nationality: "Germany", nationalID: "5512345678", countryFlag: "https://flagcdn.com/de.svg" },
  { fullName: "Fatima Al-Rashid", email: "fatima.r@gmail.com", nationality: "United Arab Emirates", nationalID: "3323456789", countryFlag: "https://flagcdn.com/ae.svg" },
  { fullName: "Lucas Silva", email: "lucas.silva@gmail.com", nationality: "Brazil", nationalID: "4434567890", countryFlag: "https://flagcdn.com/br.svg" },
  { fullName: "Emma Thompson", email: "emma.t@outlook.com", nationality: "Australia", nationalID: "6645678901", countryFlag: "https://flagcdn.com/au.svg" },
  { fullName: "Kenji Nakamura", email: "kenji.n@yahoo.co.jp", nationality: "Japan", nationalID: "9956789012", countryFlag: "https://flagcdn.com/jp.svg" },
  { fullName: "Ana Petrova", email: "ana.p@mail.ru", nationality: "Russia", nationalID: "1167890123", countryFlag: "https://flagcdn.com/ru.svg" },
  { fullName: "David Kim", email: "david.kim@gmail.com", nationality: "South Korea", nationalID: "2278901234", countryFlag: "https://flagcdn.com/kr.svg" },
  { fullName: "Sara Ahmed", email: "sara.a@gmail.com", nationality: "Egypt", nationalID: "8889012345", countryFlag: "https://flagcdn.com/eg.svg" },
  { fullName: "Thomas Müller", email: "thomas.m@gmx.de", nationality: "Germany", nationalID: "7790123456", countryFlag: "https://flagcdn.com/de.svg" },
  { fullName: "Ananya Patel", email: "ananya.p@gmail.com", nationality: "India", nationalID: "5501234567", countryFlag: "https://flagcdn.com/in.svg" },
  { fullName: "Miguel Santos", email: "miguel.s@gmail.com", nationality: "Portugal", nationalID: "3312345678", countryFlag: "https://flagcdn.com/pt.svg" },
  { fullName: "Aisha Hassan", email: "aisha.h@gmail.com", nationality: "Kenya", nationalID: "4423456789", countryFlag: "https://flagcdn.com/ke.svg" },
  { fullName: "Erik Johansson", email: "erik.j@telia.se", nationality: "Sweden", nationalID: "6634567890", countryFlag: "https://flagcdn.com/se.svg" },
  { fullName: "Charlotte Dubois", email: "charlotte.d@free.fr", nationality: "France", nationalID: "9945678012", countryFlag: "https://flagcdn.com/fr.svg" },
  { fullName: "Ravi Kumar", email: "ravi.k@gmail.com", nationality: "India", nationalID: "1156789023", countryFlag: "https://flagcdn.com/in.svg" },
  { fullName: "Liam Murphy", email: "liam.m@gmail.com", nationality: "Canada", nationalID: "2267890134", countryFlag: "https://flagcdn.com/ca.svg" },
  { fullName: "Mei Lin", email: "mei.lin@163.com", nationality: "Taiwan", nationalID: "8878901245", countryFlag: "https://flagcdn.com/tw.svg" },
  { fullName: "Carlos Hernandez", email: "carlos.h@yahoo.com", nationality: "Mexico", nationalID: "7789012356", countryFlag: "https://flagcdn.com/mx.svg" },
  { fullName: "Nina Ivanova", email: "nina.i@yandex.ru", nationality: "Russia", nationalID: "5590123467", countryFlag: "https://flagcdn.com/ru.svg" },
];

// ── Booking observation templates ─────────────────────────────────────
const OBSERVATIONS = [
  "",
  "",
  "", // Most bookings have no observations
  "",
  "",
  "We will be arriving late, around 10 PM.",
  "Celebrating our wedding anniversary! Any special arrangements would be appreciated.",
  "I have a gluten allergy — please arrange gluten-free breakfast options.",
  "We will be bringing our small dog with us.",
  "Requesting a quiet room away from the main road.",
  "We'll need an extra rollaway bed for one of the children.",
  "First time visiting — very excited!",
  "Could you arrange an airport pickup for us?",
  "We'd like to book a guided nature walk during our stay.",
  "Planning a surprise birthday celebration for my partner.",
];

// ── Helpers ───────────────────────────────────────────────────────────
function toISODate(date) {
  return date.toISOString().slice(0, -1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a realistic booking date spread across a 90-day window
 * centered around today (60 days back, 30 days forward).
 */
function generateBookingDates() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const bookings = [];

  // ── Past bookings (checked-out): 60 days back to yesterday ──────
  for (let daysAgo = 60; daysAgo > 1; ) {
    const startDate = sub(today, { days: daysAgo });
    const stayLength = randomInt(2, 8);
    const endDate = add(startDate, { days: stayLength });

    if (differenceInDays(today, endDate) >= 1) {
      bookings.push({
        startDate: toISODate(startDate),
        endDate: toISODate(endDate),
        status: "checked-out",
        created_at: toISODate(sub(startDate, { days: randomInt(5, 30) })),
      });
    }
    daysAgo -= randomInt(2, 5); // Gap between bookings
  }

  // ── Currently checked-in guests (started 1-3 days ago, end in 2-6 days)
  const checkedInCount = randomInt(2, 4);
  for (let i = 0; i < checkedInCount; i++) {
    const startDate = sub(today, { days: randomInt(1, 3) });
    const endDate = add(today, { days: randomInt(2, 6) });
    bookings.push({
      startDate: toISODate(startDate),
      endDate: toISODate(endDate),
      status: "checked-in",
      created_at: toISODate(sub(startDate, { days: randomInt(7, 25) })),
    });
  }

  // ── Today's arrivals (unconfirmed, startDate = today) ───────────
  const arrivalsToday = randomInt(2, 3);
  for (let i = 0; i < arrivalsToday; i++) {
    const endDate = add(today, { days: randomInt(3, 7) });
    bookings.push({
      startDate: toISODate(today),
      endDate: toISODate(endDate),
      status: "unconfirmed",
      created_at: toISODate(sub(today, { days: randomInt(3, 20) })),
    });
  }

  // ── Today's departures (checked-in, endDate = today) ────────────
  const departuresToday = randomInt(1, 2);
  for (let i = 0; i < departuresToday; i++) {
    const startDate = sub(today, { days: randomInt(3, 7) });
    bookings.push({
      startDate: toISODate(startDate),
      endDate: toISODate(today),
      status: "checked-in",
      created_at: toISODate(sub(startDate, { days: randomInt(5, 20) })),
    });
  }

  // ── Future bookings (unconfirmed, start 1-30 days from now) ─────
  const futureCount = randomInt(6, 10);
  for (let i = 0; i < futureCount; i++) {
    const startDate = add(today, { days: randomInt(1, 30) });
    const stayLength = randomInt(2, 10);
    const endDate = add(startDate, { days: stayLength });
    bookings.push({
      startDate: toISODate(startDate),
      endDate: toISODate(endDate),
      status: "unconfirmed",
      created_at: toISODate(sub(today, { days: randomInt(0, 14) })),
    });
  }

  return bookings;
}

// ── Core Functions ────────────────────────────────────────────────────

/**
 * Check if the demo data is fresh (has relevant bookings near today).
 * Returns true if data seems stale and needs regeneration.
 */
async function isDataStale() {
  try {
    const today = new Date();

    // Check 1: Are there any bookings at all?
    const { data: anyBookings, error: err1 } = await supabase
      .from("bookings")
      .select("id")
      .limit(1);

    if (err1 || !anyBookings || anyBookings.length === 0) return true;

    // Check 2: Are there any bookings with activity near today?
    // (startDate or endDate within 7 days of today)
    const pastStr = sub(today, { days: 7 }).toISOString();

    const { data: recentBookings, error: err2 } = await supabase
      .from("bookings")
      .select("id")
      .or(
        `startDate.gte.${pastStr},endDate.gte.${pastStr}`
      )
      .limit(1);

    if (err2 || !recentBookings || recentBookings.length === 0) return true;

    // Check 3: Is "Today's Activity" populated?
    const todayDate = format(today, "yyyy-MM-dd");
    const { data: todayActivity } = await supabase
      .from("bookings")
      .select("id")
      .or(
        `and(status.eq.unconfirmed,startDate.eq.${todayDate}),and(status.eq.checked-in,endDate.eq.${todayDate})`
      )
      .limit(1);

    if (!todayActivity || todayActivity.length === 0) return true;

    return false;
  } catch (e) {
    console.error("[DemoSimulator] Error checking staleness:", e);
    return true; // If we can't check, assume stale
  }
}

/**
 * Ensure we have enough guests in the database.
 * Inserts missing guests from the pool, skipping duplicates by email.
 */
async function ensureGuests() {
  const { data: existingGuests } = await supabase
    .from("guests")
    .select("email");

  const existingEmails = new Set(
    (existingGuests || []).map((g) => g.email)
  );

  const newGuests = GUEST_POOL.filter(
    (g) => !existingEmails.has(g.email)
  );

  if (newGuests.length > 0) {
    const { error } = await supabase.from("guests").insert(newGuests);
    if (error) console.error("[DemoSimulator] Error inserting guests:", error);
  }
}

// Tag used to identify auto-generated demo bookings
const AUTO_DEMO_TAG = "[AUTO-DEMO]";

/**
 * Main seeding function — removes only auto-generated bookings, preserves
 * user-created ones, then generates fresh demo data.
 */
async function seedFreshBookings() {
  console.log("[DemoSimulator] 🔄 Seeding fresh demo data...");

  // Ensure we have guests
  await ensureGuests();

  // Get all guest IDs and cabin IDs from the database
  const { data: guestRows } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const { data: cabinRows } = await supabase
    .from("cabins")
    .select("id, regularPrice, discount")
    .order("id");

  if (!guestRows?.length || !cabinRows?.length) {
    console.error("[DemoSimulator] ❌ No guests or cabins found. Cannot seed.");
    return false;
  }

  const guestIds = guestRows.map((g) => g.id);
  const cabins = cabinRows;

  // Delete ONLY auto-generated bookings (tagged with [AUTO-DEMO])
  const { error: deleteError } = await supabase
    .from("bookings")
    .delete()
    .like("observations", `${AUTO_DEMO_TAG}%`);

  if (deleteError) {
    console.error("[DemoSimulator] ❌ Error deleting auto-demo bookings:", deleteError);
    return false;
  }

  // Fetch remaining user-created bookings to avoid cabin date conflicts
  const { data: userBookings } = await supabase
    .from("bookings")
    .select("cabinId, startDate, endDate");

  // Build a set of "cabinId|date" strings that are already occupied
  const occupiedSlots = new Set();
  if (userBookings) {
    for (const b of userBookings) {
      const start = new Date(b.startDate);
      const end = new Date(b.endDate);
      for (let d = new Date(start); d < end; d = add(d, { days: 1 })) {
        occupiedSlots.add(`${b.cabinId}|${format(d, "yyyy-MM-dd")}`);
      }
    }
  }

  // Generate new bookings
  const bookingTemplates = generateBookingDates();
  const shuffledGuests = shuffleArray(guestIds);

  const finalBookings = [];

  for (let index = 0; index < bookingTemplates.length; index++) {
    const template = bookingTemplates[index];
    const guestId = shuffledGuests[index % shuffledGuests.length];

    // Find a cabin that doesn't conflict with user bookings for this date range
    let cabin = null;
    for (let attempt = 0; attempt < cabins.length; attempt++) {
      const candidate = cabins[(index + attempt) % cabins.length];
      let conflict = false;
      const start = new Date(template.startDate);
      const end = new Date(template.endDate);
      for (let d = new Date(start); d < end; d = add(d, { days: 1 })) {
        if (occupiedSlots.has(`${candidate.id}|${format(d, "yyyy-MM-dd")}`)) {
          conflict = true;
          break;
        }
      }
      if (!conflict) {
        cabin = candidate;
        break;
      }
    }

    // If every cabin conflicts for this range, skip this booking
    if (!cabin) continue;

    const numNights = differenceInDays(
      new Date(template.endDate),
      new Date(template.startDate)
    );
    const numGuests = randomInt(1, Math.min(4, randomInt(1, 6)));
    const hasBreakfast = Math.random() > 0.4; // 60% have breakfast
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = hasBreakfast ? numNights * 15 * numGuests : 0;
    const totalPrice = cabinPrice + extrasPrice;
    const isPaid = template.status === "checked-out" 
      ? true 
      : template.status === "checked-in" 
        ? Math.random() > 0.1 
        : Math.random() > 0.4;

    // Pick a human-readable observation, then prepend the auto-demo tag
    const humanObs = randomChoice(OBSERVATIONS);
    const taggedObs = humanObs
      ? `${AUTO_DEMO_TAG} ${humanObs}`
      : AUTO_DEMO_TAG;

    finalBookings.push({
      created_at: template.created_at,
      startDate: template.startDate,
      endDate: template.endDate,
      numNights,
      numGuests,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: template.status,
      hasBreakfast,
      isPaid,
      observations: taggedObs,
      cabinId: cabin.id,
      guestId,
    });

    // Mark these slots as occupied so demo bookings don't conflict with each other
    const start = new Date(template.startDate);
    const end = new Date(template.endDate);
    for (let d = new Date(start); d < end; d = add(d, { days: 1 })) {
      occupiedSlots.add(`${cabin.id}|${format(d, "yyyy-MM-dd")}`);
    }
  }

  // Insert in batches to avoid payload limits
  const BATCH_SIZE = 15;
  for (let i = 0; i < finalBookings.length; i += BATCH_SIZE) {
    const batch = finalBookings.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from("bookings").insert(batch);
    if (error) {
      console.error("[DemoSimulator] ❌ Error inserting batch:", error);
      return false;
    }
  }

  console.log(
    `[DemoSimulator] ✅ Seeded ${finalBookings.length} demo bookings (user bookings preserved)!`
  );
  return true;
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Check data freshness and auto-seed if necessary.
 * Called from the dashboard on mount.
 * Uses localStorage to prevent concurrent runs and excessive re-seeding.
 */
export async function ensureFreshDemoData() {
  try {
    // Prevent concurrent runs
    const lockTimestamp = localStorage.getItem(SEED_LOCK_KEY);
    if (lockTimestamp && Date.now() - Number(lockTimestamp) < 30000) {
      console.log("[DemoSimulator] ⏳ Another seed is in progress, skipping.");
      return;
    }

    // Cooldown: don't re-seed within 1 hour
    const lastSeed = localStorage.getItem(SEED_TIMESTAMP_KEY);
    if (lastSeed && Date.now() - Number(lastSeed) < SEED_COOLDOWN_MS) {
      console.log("[DemoSimulator] ⏳ Seeded recently, skipping.");
      return;
    }

    // Check if data is actually stale
    const stale = await isDataStale();
    if (!stale) {
      console.log("[DemoSimulator] ✅ Data is fresh, no action needed.");
      return;
    }

    // Acquire lock
    localStorage.setItem(SEED_LOCK_KEY, String(Date.now()));

    const success = await seedFreshBookings();

    if (success) {
      localStorage.setItem(SEED_TIMESTAMP_KEY, String(Date.now()));
    }

    // Release lock
    localStorage.removeItem(SEED_LOCK_KEY);
  } catch (error) {
    console.error("[DemoSimulator] ❌ Error in ensureFreshDemoData:", error);
    localStorage.removeItem(SEED_LOCK_KEY);
  }
}

