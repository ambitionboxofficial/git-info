const json = (data = {}, success = true, message = "") => {
  return {
    data,
    message,
    success
  };
};

module.exports = { json };
