const { getRepoInfo: repoInfo } = require("../partials/gitter");
const { json } = require("../partials/response");

const isPathValid = path => path.indexOf(process.env.BASE_PATH) === 0;

const getRepoInfo = (req, res) => {
  try {
    const { path } = req.query;

    if (!isPathValid(path)) throw new Error("Invalid path");

    repoInfo(path)
      .then(data => {
        return res.send(json(data));
      })
      .catch(err => {
        return res.send(json(null, false, err.message));
      });
  } catch (error) {
    return res.send(json(null, false, error.message));
  }
};

module.exports = { getRepoInfo };
