//Here we will just write routes for our main files
const data = require("./MOCK_DATA _for_Express.json"); //add this in this file as the data should be defined here

function apiUsersFull(req, res) {
  return res.json(data);
}

function apiUsersStaticRoute(req, res) {
  return res.json(data.filter((obj) => obj.id === 1));
}

function apiUsersDynamicRoute(req, res) {
  const id = Number(req.params.id);
  return res.json(data.filter((obj) => obj.id === id));
}

module.exports = { apiUsersDynamicRoute, apiUsersStaticRoute, apiUsersFull };
