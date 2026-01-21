const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/aiRoutes");

const app = express(); // Express instance

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

module.exports = app; // ✅ export ONLY the app
