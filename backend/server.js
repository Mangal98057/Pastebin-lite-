
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const pasteRoutes = require("./routes/pasteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/healthz", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

app.use("/api/pastes", pasteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Backend running")))
  .catch(err => console.error(err));
