const axios = require("axios");
const Dev = require("../models/Dev");
const parseArrayAsString = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const api_resp = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, avatar_url, bio } = api_resp.data;

      const techArray = parseArrayAsString(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  },

  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async update(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async destroy(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  }
};
