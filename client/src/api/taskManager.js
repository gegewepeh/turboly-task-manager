const axios = require("axios");

const initAxios = axios.create({
  baseURL: "http://localhost:4000"
});

module.exports = initAxios;
