const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { fetchAds } = require("./dbConnect");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

// ตั้งค่า express-session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ตั้งค่า Passport Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: "974768087771-jctvt2ou4qn59id1ubpusa3eprcpj5tj.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://ads-backend.up.railway.app/auth/google/callback", // เปลี่ยนเป็น URL ของ Railway
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://ads-frontend-git-main-babypors-projects.vercel.app/dashboard"); // เปลี่ยน URL ให้ Redirect กลับไปยัง Frontend
  }
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ใช้งาน session และ passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "https://ads-frontend-git-main-babypors-projects.vercel.app",
}));
// Route สำหรับหน้าแรก
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.send('<a href="/auth/google">Sign in with Google</a>');
  }
});

// Route สำหรับ Google OAuth
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://ads-frontend-git-main-babypors-projects.vercel.app/dashboard");
  }
);

// Route สำหรับ Dashboard
app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "dashboard.html"));
  } else {
    res.redirect("/");
  }
});

// Route สำหรับดึงข้อมูลโฆษณา
app.get("/api/ads", async (req, res) => {
  try {
    const ads = await fetchAds(); // ใช้ฟังก์ชัน fetchAds จาก dbConnect.js
    res.json(ads);
  } catch (err) {
    console.error("Error fetching ads:", err.message);
    res.status(500).send("Error fetching ads");
  }
});

// Route สำหรับ Logout
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/check-auth", (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
});

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
