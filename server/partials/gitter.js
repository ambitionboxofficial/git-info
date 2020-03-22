const { readdirSync } = require("fs");
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

        const branch = execSync(`cd ${path} && git rev-parse --abbrev-ref HEAD`)
          .toString()
          .trim();

        const seed = Math.floor(Math.random() * 999999);

        const result = {
          name,
          projectName: path.split("/").pop(),
          email,
          date,
          relativeDate,
          path,
          hash,
          subject,
          branch,
          color: getColor(seed, 0.2),
          borderColor: getColor(seed, 0.5)
        };
        resolve(result);
      }
    });
  });
};

const calculate = config => {
  const { environments } = config;

  const allPromises = [];

  environments.forEach(env => {
    const { projects } = env;

    projects.forEach(project => {
      const { path } = project;
      allPromises.push(getRepoInfo(path));
    });
  });

  return Promise.all(allPromises).then(data => {
    return formatResponse(config, data);
  });
};

const formatResponse = (config, data) => {
  const dataIndexMap = {};

  data.forEach((d, index) => {
    const { path } = d;
    dataIndexMap[path] = index;
  });

  const { environments } = config;

  const newEnvironment = environments.map(env => {
    const { projects } = env;
    const newProjects = projects.map(project => {
      const { path } = project;
      const enrichedProject = {
        ...project,
        ...data[dataIndexMap[path]]
      };

      return enrichedProject;
    });

    const enrichedProject = {
      ...env,
      projects: newProjects
    };

    return enrichedProject;
  });

  return newEnvironment;
};

module.exports = { calculate };
