const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  phone: String,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Route for form submission
app.post("/submit", async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  console.log("Form Data:", req.body);

  await Contact.create({ name, email, phone: phoneNumber });

  res.send("<h1>Thanks! Your message has been submitted.</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
