import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();


// ✅ Middleware
app.use(
  cors({
    origin: [
       "https://cf-admin.vercel.app",
  "https://cf-user.vercel.app",
  "https://admin.cinemafactory.co.in",
  "https://user.cinemafactory.co.in",
  "https://www.cinemafactoryacademy.com",
  "https://cinemafactoryacademy.com",
  "https://cinemafactory.co.in",
  "https://www.cinemafactory.co.in",
  "https://qa.phicommerce.com",
  "https://payphi.com",
  "http://localhost:5173",
  "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // 👈 add PATCH & OPTIONS
    credentials: true,
  })
);


const allowedOrigins = [
  "https://cf-admin.vercel.app",
  "https://cf-user.vercel.app",
  "https://admin.cinemafactory.co.in",
  "https://user.cinemafactory.co.in",
  "https://www.cinemafactoryacademy.com",
  "https://cinemafactoryacademy.com",
  "https://cinemafactory.co.in",
  "https://www.cinemafactory.co.in",
  "https://qa.phicommerce.com",
  "https://payphi.com",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow server-to-server requests with no Origin (PayPhi callbacks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        console.log(`✅ CORS allowed for: ${origin}`);
        callback(null, true);
      } else {
        console.log(`❌ CORS blocked for: ${origin}`);
        callback(new Error("CORS policy: Not allowed by origin"));
      }
    },
    credentials: true,
     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure uploads folder exists
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//=================
//   EXTRA INPUT
//=================

import authRoutes from "./Routes/authRoutes.js";

import payphiRoutes from "./Routes/payphiRoutes.js";

import paymentDetailes from "./Routes/paymentDetailes.js";

import faqRoutes from "./Routes/faqRoutes.js";

// -------------------------
// ✅ Routes Import
// -------------------------
import HomeBanner from "./Routes/Home/HomeBannerRoutes.js";
import VideoRoutes from "./Routes/Home/VideoGalleryRoutes.js";
import MentorRoutes from "./Routes/Home/HomeMentorRoutes.js";
import HomeExclusive from "./Routes/Home/HomeExclusive.js";
import HomeFilmography from "./Routes/Home/HomeFilmography.js";
import videoGalleryBannerRoute from "./Routes/Home/VideoGalleryBannerRoute.js";

import DirectionBanner from "./Routes/Direction/DirectionBanner.js";
import DirectionHighlights from "./Routes/Direction/DirectionHighlights.js";
import DirectionDiploma from "./Routes/Direction/DirectionDiploma.js";
import DirectionMentor from "./Routes/Direction/DirectionMentor.js";
import DirectionFilmography from "./Routes/Direction/DirectionFilmography.js";

import ActingBanner from "./Routes/Acting/ActingBanner.js";
import ActingMentor from "./Routes/Acting/ActingMentor.js";
import ActingDiploma from "./Routes/Acting/ActingDiploma.js";

import CinematographyBanner from "./Routes/Cinematography/CinematographyBanner.js";
import CinematographyHighlights from "./Routes/Cinematography/CinematographyHighlights.js";
import CinematographyDiploma from "./Routes/Cinematography/CinematographyDiploma.js";
import CinematographyMentor from "./Routes/Cinematography/CinematographyMentor.js";
import CinematographyFilmography from "./Routes/Cinematography/CinematographyFilmography.js";

import DiBanner from "./Routes/Di/DiBanner.js";
import DiHighlights from "./Routes/Di/DiHighlights.js";
import DiMentor from "./Routes/Di/DiMentor.js";
import DiFilmography from "./Routes/Di/DiFilmography.js";
import DiDiploma from "./Routes/Di/DiDiploma.js";

import EditingBanner from "./Routes/Editing/EditingBanner.js";
import EditingHighlights from "./Routes/Editing/EditingHighlights.js";
import EditingDiploma from "./Routes/Editing/EditingDiploma.js";
import EditingMentor from "./Routes/Editing/EditingMentor.js";
import EditingFilmography from "./Routes/Editing/EditingFilmography.js";

import PhotographyBanner from "./Routes/Photography/PhotographyBanner.js";
import PhotographyMentor from "./Routes/Photography/PhotographyMentor.js";
import PhotographyFilmography from "./Routes/Photography/PhotographyFilmography.js";
import PhotographyDiploma from "./Routes/Photography/PhotographyDiploma.js";

import VfxBanner from "./Routes/Vfx/vfxBanner.js";
import VfxHighlights from "./Routes/Vfx/vfxHighlights.js";
import VfxDiploma from "./Routes/Vfx/vfxDiploma.js";
import VfxMentor from "./Routes/Vfx/vfxMentor.js";
import VfxFilmography from "./Routes/Vfx/vfxFilmography.js";

import VirtualProductionBanner from "./Routes/VirtualProduction/VirtualProductionBanner.js";
import VirtualProductionMentor from "./Routes/VirtualProduction/VirtualProductionMentor.js";
import VirtualProductionFilmography from "./Routes/VirtualProduction/VirtualProductionFilmography.js";
import VirtualProductionDiploma from "./Routes/VirtualProduction/VirtualProductionDiploma.js";

import CfaBanner from "./Routes/Cfa/CfaBanner.js";
import CfaDiploma from "./Routes/Cfa/CfaDiploma.js";
import CfaMentor from "./Routes/Cfa/CfaMentor.js";
import CfaFilmography from "./Routes/Cfa/CfaFilmography.js";

import StageUnrealBanner from "./Routes/StageUnreal/StageUnrealBanner.js";
import StageUnrealDiploma from "./Routes/StageUnreal/StageUnrealDiploma.js";
import StageUnrealMentor from "./Routes/StageUnreal/StageUnrealMentor.js";
import StageUnrealFilmography from "./Routes/StageUnreal/StageUnrealFilmography.js";

// ✅ Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Auth
app.use("/api/auth", authRoutes);

app.use("/api/payphi", payphiRoutes);

app.use("/api/payment", paymentDetailes);

app.use("/api/faqs", faqRoutes);

// ✅ Register routes
app.use("/api/homebanner", HomeBanner);
app.use("/api/exclusive", HomeExclusive);
app.use("/api/videos", VideoRoutes);
app.use("/api/mentors", MentorRoutes);
app.use("/api/homefilmography", HomeFilmography);
app.use("/api/videogallerybanner", videoGalleryBannerRoute);

app.use("/api/directionbanner", DirectionBanner);
app.use("/api/directionhighlights", DirectionHighlights);
app.use("/api/directiondiploma", DirectionDiploma);
app.use("/api/directionmentor", DirectionMentor);
app.use("/api/directionfilmography", DirectionFilmography);

app.use("/api/actingbanner", ActingBanner);
app.use("/api/actingmentor", ActingMentor);
app.use("/api/actingdiploma", ActingDiploma);

app.use("/api/cinematographybanner", CinematographyBanner);
app.use("/api/cinematographyhighlights", CinematographyHighlights);
app.use("/api/cinematographydiploma", CinematographyDiploma);
app.use("/api/cinematographymentor", CinematographyMentor);
app.use("/api/cinematographyfilmography", CinematographyFilmography);

app.use("/api/dibanner", DiBanner);
app.use("/api/dihighlights", DiHighlights);
app.use("/api/dimentor", DiMentor);
app.use("/api/difilmography", DiFilmography);
app.use("/api/didiploma", DiDiploma);

app.use("/api/editingbanner", EditingBanner);
app.use("/api/editinghighlights", EditingHighlights);
app.use("/api/editingdiploma", EditingDiploma);
app.use("/api/editingmentor", EditingMentor);
app.use("/api/editingfilmography", EditingFilmography);

app.use("/api/photographybanner", PhotographyBanner);
app.use("/api/photographymentor", PhotographyMentor);
app.use("/api/photographyfilmography", PhotographyFilmography);
app.use("/api/photographydiploma", PhotographyDiploma);

app.use("/api/vfxbanner", VfxBanner);
app.use("/api/vfxhighlights", VfxHighlights);
app.use("/api/vfxdiploma", VfxDiploma);
app.use("/api/vfxmentor", VfxMentor);
app.use("/api/vfxfilmography", VfxFilmography);

app.use("/api/virtualproductionbanner", VirtualProductionBanner);
app.use("/api/virtualproductionmentor", VirtualProductionMentor);
app.use("/api/virtualproductionfilmography", VirtualProductionFilmography);
app.use("/api/virtualproductiondiploma", VirtualProductionDiploma);

app.use("/api/cfabanner", CfaBanner);
app.use("/api/cfadiploma", CfaDiploma);
app.use("/api/cfamentor", CfaMentor);
app.use("/api/cfafilmography", CfaFilmography);

app.use("/api/stageunrealbanner", StageUnrealBanner);
app.use("/api/stageunrealdiploma", StageUnrealDiploma);
app.use("/api/stageunrealmentor", StageUnrealMentor);
app.use("/api/stageunrealfilmography", StageUnrealFilmography);
// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    // comment out process.exit(1) while debugging on cPanel
    // process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
