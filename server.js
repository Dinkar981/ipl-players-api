const express = require("express");
const connectDB = require("./db/connect");
const playerRoutes = require("./routes/playerRoutes");

const app = express();
app.use(express.json());
app.use("/api", playerRoutes);

connectDB();

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
