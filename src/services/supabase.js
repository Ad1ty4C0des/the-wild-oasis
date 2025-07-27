import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://scapxghfhnwjbrntoakn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjYXB4Z2hmaG53amJybnRvYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTI1NTEsImV4cCI6MjA2ODUyODU1MX0.1XS-86Rj-XhMVeUV8kYb7KrB7sE1bVo3dllBJSfC4ws";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
