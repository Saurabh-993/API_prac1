const express = require("express");
const routes = require("./routes.js");
const data = require("./MOCK_DATA _for_Express.json");

const PORT = 11111;
const app = express();

app.listen(PORT, () => console.log("The server is live now!"));

app.get("/users", (req, res) => {
  return res.json(data);
});
