require("dotenv").config();

const { calculate } = require("./partials/gitter");

const express = require("express");

const { readFileSync } = require("fs");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/repo/info", (req, res) => {
  return res.send({});
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);
