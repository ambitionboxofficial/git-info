require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors("*"));

const CLIENT_BUILD_PATH = "/../client/build/";

const Repo = require("./routes/Repo");

app.get("/config.json", (req, res) => {
  return res.sendFile(path.join(__dirname, "./static", "config.json"));
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, CLIENT_BUILD_PATH)));

// An api endpoint that returns a short list of items
app.get("/api/repo/info", Repo.getRepoInfo);

const port = process.env.PORT || 3000;
app.listen(port);

console.log("App listening on %s", port);
