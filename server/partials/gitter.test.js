const { readFileSync } = require("fs");

const { calculate } = require("./gitter");
const config = JSON.parse(readFileSync("gitinfoconfig.json").toString());
calculate(config)
  .then(result => {
    console.log("result", JSON.stringify(result, null, 4));
  })
  .catch(err => {
    console.log("err", err);
  });
