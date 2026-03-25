const express = require("express");
const routes = require("./routes.js");
const data = require("./MOCK_DATA _for_Express.json");

const PORT = 11111;
const app = express();
const sameRoute = "/api/users";
app.listen(PORT, () => console.log("The server is live now!"));

// app.use(express.json());//this is used if the incomming request have json (raw) data
app.use(express.urlencoded({ extended: true })); //this is used if the incomming data have form(basic html form url encoded) like request

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
app
  .route(sameRoute)
  .post(routes.postRequestSuccess)
  .put(routes.putRequestSuccess)
  .patch(routes.patchRequestSuccess)
  .delete(routes.deleteRequestSuccess);
// this is the way through which we can add multiple method responses through a same command , whatever will be the request the response will be accordingly.
