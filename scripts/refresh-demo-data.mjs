/**
 * Demo Data Refresh Script — for GitHub Actions cron
 * ===================================================
 * Runs daily via GitHub Actions to keep the live demo fresh.
 *
 * What it does:
 * 1. Clears all existing bookings
 * 2. Ensures guests exist in the database
 * 3. Generates a realistic rolling 90-day window of bookings
 * 4. Guarantees "Today's Activity" has arrivals & departures
 *
 * Usage: node scripts/refresh-demo-data.mjs
 *
 * Required env vars:
 *   SUPABASE_URL      — Your Supabase project URL
 *   SUPABASE_KEY      — Your Supabase service role key (NOT anon key)
 */

import { createClient } from "@supabase/supabase-js";

// ── Supabase client ───────────────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_KEY environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: undefined },
  auth: { persistSession: false },
});

// ── Helpers ───────────────────────────────────────────────────────────
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function subDays(date, days) {
  return addDays(date, -days);
}

function diffDays(d1, d2) {
  return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
}

function toISO(date) {
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
  { fullName: "Fatima Al-Rashid", email: "fatima.r@gmail.com", nationality: "UAE", nationalID: "3323456789", countryFlag: "https://flagcdn.com/ae.svg" },
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

const OBSERVATIONS = [
  "", "", "", "", "",
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

// ── Ensure Guests ─────────────────────────────────────────────────────
async function ensureGuests() {
  const { data: existingGuests } = await supabase.from("guests").select("email");
  const existingEmails = new Set((existingGuests || []).map((g) => g.email));
  const newGuests = GUEST_POOL.filter((g) => !existingEmails.has(g.email));

  if (newGuests.length > 0) {
    const { error } = await supabase.from("guests").insert(newGuests);
    if (error) console.error("Error inserting guests:", error.message);
    else console.log(`✅ Inserted ${newGuests.length} new guests`);
  } else {
    console.log("✅ All guests already exist");
  }
}

// ── Generate Bookings ─────────────────────────────────────────────────
function generateBookingDates() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const bookings = [];

  // Past bookings (checked-out): 60 days back
  for (let daysAgo = 60; daysAgo > 1; ) {
    const startDate = subDays(today, daysAgo);
    const stayLength = randomInt(2, 8);
    const endDate = addDays(startDate, stayLength);
    if (diffDays(today, endDate) >= 1) {
      bookings.push({
        startDate: toISO(startDate),
        endDate: toISO(endDate),
        status: "checked-out",
        created_at: toISO(subDays(startDate, randomInt(5, 30))),
      });
    }
    daysAgo -= randomInt(2, 5);
  }

  // Currently checked-in
  for (let i = 0; i < randomInt(2, 4); i++) {
    const startDate = subDays(today, randomInt(1, 3));
    const endDate = addDays(today, randomInt(2, 6));
    bookings.push({
      startDate: toISO(startDate),
      endDate: toISO(endDate),
      status: "checked-in",
      created_at: toISO(subDays(startDate, randomInt(7, 25))),
    });
  }

  // Today's arrivals (unconfirmed)
  for (let i = 0; i < randomInt(2, 3); i++) {
    const endDate = addDays(today, randomInt(3, 7));
    bookings.push({
      startDate: toISO(today),
      endDate: toISO(endDate),
      status: "unconfirmed",
      created_at: toISO(subDays(today, randomInt(3, 20))),
    });
  }

  // Today's departures (checked-in, endDate = today)
  for (let i = 0; i < randomInt(1, 2); i++) {
    const startDate = subDays(today, randomInt(3, 7));
    bookings.push({
      startDate: toISO(startDate),
      endDate: toISO(today),
      status: "checked-in",
      created_at: toISO(subDays(startDate, randomInt(5, 20))),
    });
  }

  // Future bookings (unconfirmed)
  for (let i = 0; i < randomInt(6, 10); i++) {
    const startDate = addDays(today, randomInt(1, 30));
    const endDate = addDays(startDate, randomInt(2, 10));
    bookings.push({
      startDate: toISO(startDate),
      endDate: toISO(endDate),
      status: "unconfirmed",
      created_at: toISO(subDays(today, randomInt(0, 14))),
    });
  }

  return bookings;
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  console.log("🏨 The Wild Oasis — Demo Data Refresh");
  console.log(`📅 ${new Date().toISOString()}`);
  console.log("─".repeat(50));

  // Step 1: Ensure guests
  await ensureGuests();

  // Step 2: Get IDs
  const { data: guestRows } = await supabase.from("guests").select("id").order("id");
  const { data: cabinRows } = await supabase.from("cabins").select("id, regularPrice, discount").order("id");

  if (!guestRows?.length || !cabinRows?.length) {
    console.error("❌ No guests or cabins found. Ensure cabins are seeded.");
    process.exit(1);
  }

  console.log(`📊 Found ${guestRows.length} guests, ${cabinRows.length} cabins`);

  // Step 3: Delete old bookings
  const { error: deleteError } = await supabase.from("bookings").delete().gt("id", 0);
  if (deleteError) {
    console.error("❌ Error deleting bookings:", deleteError.message);
    process.exit(1);
  }
  console.log("🗑️  Cleared old bookings");

  // Step 4: Generate and insert new bookings
  const templates = generateBookingDates();
  const guestIds = shuffleArray(guestRows.map((g) => g.id));

  const finalBookings = templates.map((template, index) => {
    const cabin = cabinRows[index % cabinRows.length];
    const guestId = guestIds[index % guestIds.length];
    const numNights = diffDays(new Date(template.endDate), new Date(template.startDate));
    const numGuests = randomInt(1, 4);
    const hasBreakfast = Math.random() > 0.4;
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = hasBreakfast ? numNights * 15 * numGuests : 0;
    const totalPrice = cabinPrice + extrasPrice;
    const isPaid = template.status === "checked-out" ? true : template.status === "checked-in" ? Math.random() > 0.1 : Math.random() > 0.4;

    return {
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
      observations: randomChoice(OBSERVATIONS),
      cabinId: cabin.id,
      guestId,
    };
  });

  // Insert in batches
  const BATCH_SIZE = 15;
  let inserted = 0;
  for (let i = 0; i < finalBookings.length; i += BATCH_SIZE) {
    const batch = finalBookings.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from("bookings").insert(batch);
    if (error) {
      console.error(`❌ Error inserting batch ${i / BATCH_SIZE + 1}:`, error.message);
    } else {
      inserted += batch.length;
    }
  }

  // Summary
  const statusCounts = finalBookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  console.log("─".repeat(50));
  console.log(`✅ Inserted ${inserted} bookings:`);
  console.log(`   📤 Checked-out: ${statusCounts["checked-out"] || 0}`);
  console.log(`   🏨 Checked-in:  ${statusCounts["checked-in"] || 0}`);
  console.log(`   📋 Unconfirmed: ${statusCounts["unconfirmed"] || 0}`);
  console.log("─".repeat(50));
  console.log("🎉 Demo data refresh complete!");
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});

