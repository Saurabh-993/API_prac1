const express = require("express");
const routes = require("./routes.js");
const data = require("./MOCK_DATA _for_Express.json");

const PORT = 11111;
const app = express();

app.listen(PORT, () => console.log("The server is live now!"));

app.get("/api/users", (req, res) => {
  return res.json(data); //just a good practice to add return
});

app.get("/api/users/1", (req, res) => {
  return res.json(
    data.filter((obj) => {
      return obj.id === 1; //it is static routing
    }),
  );
});
