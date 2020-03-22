const { readdirSync } = require("fs");
const { execSync } = require("child_process");
const { join } = require("path");
const gitlog = require("gitlog");
const randomColor = require("randomcolor"); // import the script

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

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

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
          authorName: name,
          committerEmail: email,
          committerDate: date,
          committerDateRel: relativeDate,
          abbrevHash: hash,
          subject
        } = history;

        const branch = execSync(
          `cd ${path} && git rev-parse --abbrev-ref HEAD`
        ).toString();

        const result = {
          name,
          email,
          date,
          relativeDate,
          path,
          hash,
          subject,
          branch
        };
        resolve(result);
      }
    });
  });
};

const calculate = (baseDir = "", projects = [], paths = []) => {
  if (baseDir.length === 0 || paths.length === 0 || projects.length === 0) {
    return;
  }

  const allPromises = [];

  return new Promise((resolve, reject) => {
    paths.forEach(dirPath => {
      const basePath = join(baseDir, dirPath);

      const directories = getDirectories(basePath);

      for (let i = 0; i < directories.length; i++) {
        const element = directories[i];
        const projectPath = join(basePath, element);
        allPromises.push(getRepoInfo(projectPath));
      }
    });

    const result = {};

    Promise.all(allPromises).then(data => {
      data.forEach((info, index) => {
        const { path } = info;
        if (!path) return;

        const envPath = paths.filter(p => path.indexOf(p) > 0)[0];
        info.projectName = path.split("/").pop();

        const seed = Math.floor(Math.random() * (index + 1) * 9999);

        info.color = getColor(seed, 0.2);
        info.borderColor = getColor(seed, 0.5);

        if (!result[envPath]) result[envPath] = { projects: [] };

        result[envPath].projects.push(info);
      });

      const finalResult = [];
      const allEnvNames = Object.keys(result);

      allEnvNames.forEach(env => {
        finalResult.push({
          name: env,
          ...result[env]
        });
      });

      return resolve(finalResult);
    });
  });
};

module.exports = { calculate };
