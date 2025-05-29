const express = require("express");
const cors = require("cors");
const feedbackRoutes = require('./routes/feedback')
const basicRoutes = require('./routes/basic');
const path = require("path");

// Middleware and configuration
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
});




app.use("/feedback",feedbackRoutes);
app.use('/basic', basicRoutes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, async () => {
  try {
    console.log(`listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
