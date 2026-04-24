import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wxsewjhnmdvieqwyenem.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4c2V3amhubWR2aWVxd3llbmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTczNjEsImV4cCI6MjA5MjU5MzM2MX0.34nKJ-yofdCQ3WQP9iOGXStmp0q_7SyVBHOwzFsCM4I";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
