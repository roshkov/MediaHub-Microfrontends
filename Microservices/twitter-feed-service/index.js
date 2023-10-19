const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Sample data (you can replace this with actual Twitter data)
const tweets = [
  { id: 1, text: "This is a tweet!" },
  { id: 2, text: "Another tweet here." },
  { id: 3, text: "Yet another tweet." },
];

// Define a route to get all tweets
app.get("/api/tweets", (req, res) => {
  res.json(tweets);
});

// Start the server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Twitter service is running on port ${PORT}`);
});
