//Here we will just write routes for our main files
const { json } = require("stream/consumers");
const data = require("./MOCK_DATA _for_Express.json"); //add this in this file as the data should be defined here
const fs = require("fs");

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

function userBrowser(req, res) {
  return res.send(`<ul>
       ${data.map((obj) => `<li> ${obj.first_name}</li>`).join("\n")}
        </ul>`);
}

// function pendingProgress(req, res) {
//   const newEntry = req.body;
//   data.push(newEntry);
//   fs.writeFile(
//     "MOCK_DATA _for_Express.json",
//     JSON.stringify(data, null, 2),
//     () =>
//       //here we added a new value inside the MOCk_data file here I have to insert the ID through postman
//       console.log(newEntry, "\n entry added!"),
//   );
//   return res.end("Process in Progress!");
// }

function pendingProgress(req, res) {
  const newEntry = req.body;
  data.push({ ...newEntry, id: `${data.length + 1}` }); //this ... is spread function is basically destruct the object, here with the help of this one,
  // we are just generating new id's for the entries DataBases uses similar kind of logics for entries (note: their logics are much better and complex)
  fs.writeFile(
    "MOCK_DATA _for_Express.json",
    JSON.stringify(data, null, 2),
    () =>
      //here we added a new value inside the MOCk_data file here I have to insert the ID through postman
      console.log(newEntry, "\n entry added!"),
  );
  return res.end("Process in Progress!");
}

module.exports = {
  apiUsersDynamicRoute,
  apiUsersStaticRoute,
  apiUsersFull,
  userBrowser,
  pendingProgress,
};
