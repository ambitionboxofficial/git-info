const { execSync } = require("child_process");
const gitlog = require("gitlog");
const randomColor = require("randomcolor");

const GITLOG_DEFAULTS = {
  number: 1,
  fields: [
    "committerName",
    "committerEmail",
    "committerDate",
    "committerDateRel",
    "subject",
    "abbrevHash",
    "authorName"
  ]
};

const getColor = (seed, alpha) => {
  return randomColor({
    seed,
    format: "rgba",
    alpha
  });
};

const getRepoInfo = path => {
  return new Promise((resolve, reject) => {
    const options = { ...GITLOG_DEFAULTS, repo: path };

    gitlog(options, (err, commits) => {
      if (err) resolve({});

      if (commits && commits.length > 0) {
        const history = commits[0];

        const {
          authorName,
          committerEmail: email,
          committerDate: date,
          committerDateRel: relativeDate,
          abbrevHash: hash,
          subject
        } = history;

        const branch = execSync(`cd ${path} && git rev-parse --abbrev-ref HEAD`)
          .toString()
          .trim();

        const seed = Math.floor(Math.random() * 999999);

        const result = {
          authorName,
          projectName: path.split("/").pop(),
          email,
          date,
          relativeDate,
          path,
          hash,
          subject,
          branch,
          background: getColor(seed, 0.3),
          borderColor: getColor(seed, 0.7)
        };
        resolve(result);
      }
    });
  });
};

module.exports = { getRepoInfo };
