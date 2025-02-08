const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
    res.render("index", { videoId: null });
});

// Handle Form Submission
app.post("/download", (req, res) => {
    const videoUrl = req.body.videoLink;
    const videoId = extractVideoId(videoUrl);

    if (videoId) {
        res.render("index", { videoId });
    } else {
        res.render("index", { videoId: null, error: "Invalid YouTube URL!" });
    }
});

// Function to Extract Video ID
function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
