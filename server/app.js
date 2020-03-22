require("dotenv").config();

const { calculate } = require("./partials/gitter");

const express = require("express");
const mustacheExpress = require("mustache-express");

const { readFileSync } = require("fs");

const app = express();
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

const config = JSON.parse(readFileSync("gitinfoconfig.json").toString());

app.get("/", function(req, res) {
  calculate(config).then(stats => {
    res.render("index", {
      title: config.name,
      stats,
      spacingAround: stats.length < 2
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
