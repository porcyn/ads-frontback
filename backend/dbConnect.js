const { createClient } = require("@supabase/supabase-js");

// ตั้งค่าการเชื่อมต่อ Supabase
const SUPABASE_URL = "https://dctlhkbswkfkgithaofz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdGxoa2Jzd2tma2dpdGhhb2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MDg1MDQsImV4cCI6MjA0OTI4NDUwNH0.HY8tmHgnzkmuabvWhE-zNZAuXKKL10R3hPJJTF1kgBM";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchAds() {
  try {
    const { data, error } = await supabase.from("ads").select("*");

    if (error) {
      console.error("Error fetching ads:", error.message);
      throw error;
    }

    console.log("Fetched ads:", data);
    return data;
  } catch (err) {
    console.error("Error in fetchAds:", err.message);
    return [];
  }
}

module.exports = { fetchAds };
