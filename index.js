const express = require("express");
const routes = require("./routes.js");
const data = require("./MOCK_DATA _for_Express.json");

const PORT = 11111;
const app = express();

app.listen(PORT, () => console.log("The server is live now!"));

// app.get("/api/users", (req, res) => {
//   return res.json(data); //just a good practice to add return
// });

app.get("/api/users", routes.apiUsersFull); //through routing

// app.get("/api/users/1", (req, res) => {
//   return res.json(
//     data.filter((obj) => {
//       return obj.id === 1; //it is static routing
//     }),
//   );
// });

// app.get("/api/users/1", routes.apiUsersStaticRoute); this is the abstract version through routes

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id); //I did this because req.params.id provide us string so first convert it to number so we can compare it
//   return res.json(
//     data.filter((obj) => {
//       return obj.id === id; // this is dynamic routing
//     }),
//   );
// });

app.get("/api/users/:id", routes.apiUsersDynamicRoute);

//Here we will create a route through which we can provide direct html to the user

app.get("/users", routes.userBrowser);
