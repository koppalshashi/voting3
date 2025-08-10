const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Serve login.html at root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vote", require("./routes/voteRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/candidates", require("./routes/candidateRoutes"));
app.use("/api/form-sync", require("./routes/formSyncRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
