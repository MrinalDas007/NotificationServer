const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Notification = require("./models/notification"); // Import the Notification model
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
// Connect to MongoDB (Replace 'your_mongo_db_url' with your MongoDB connection string)
mongoose.connect(
  `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.5syh4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Route to insert notification data
app.post("/notifications", async (req, res) => {
  const notification = new Notification(req.body);
  try {
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to retrieve all notifications
app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
