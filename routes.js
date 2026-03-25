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

function postRequestSuccess(req, res) {
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

function putRequestSuccess(req, res) {
  const replaceEntryID = Number(req.body.id); //because request ko string form mai hi smjha jaata hai
  const replacingObject = data.filter((obj) => obj.id === replaceEntryID); //NOTE: here the replacing object is an array of single objecgt as filter return array.
  const indexReplace = data.indexOf(...replacingObject); //Here the spread function is breaking the array and making it only object.
  data[indexReplace] = req.body; //we are just putting body (received object) inside the array of objects.
  //Note: agar aap find use karte to ek object milta and findIndex ke through seedhe index hi mil jaata, numeric value.
  fs.writeFile(
    "MOCK_DATA _for_Express.json",
    JSON.stringify(data, null, 2),
    (err, success) => console.log("the data is updated now!"),
  );
  return res.end("entry is updated");
}

function patchRequestSuccess(req, res) {
  const updateEntryId = req.body.id; //dude we didn't convert this one into number as the entry that we provided is in string form in database (here mock_Data).
  const updateobj = data.find((obj) => obj.id === updateEntryId); //here we can see that find provides the first object that matches.
  const indexUpdate = data.indexOf(updateobj);
  data[indexUpdate].last_name = req.body.last_name;
  fs.writeFile(
    "MOCK_DATA _for_Express.json",
    JSON.stringify(data, null, 2),
    (err, suc) => console.log("updated the item"),
  );
  return res.end("Your data is has been updates");
}

function deleteRequestSuccess(req, res) {
  const deleteId = Number(req.body.id);
  const deleteIndex = data.findIndex((obj) => obj.id === deleteId);
  data.splice(deleteIndex, 1); //this command just will delete the element that we are asking for.
  fs.writeFile(
    "MOCK_DATA _for_Express.json",
    JSON.stringify(data, null, 2),
    (err, suc) => {
      console.log("the targeted element is deleted");
    },
  );
  return res.end("your request is completed!");
}

module.exports = {
  apiUsersDynamicRoute,
  apiUsersStaticRoute,
  apiUsersFull,
  userBrowser,
  postRequestSuccess,
  putRequestSuccess,
  patchRequestSuccess,
  deleteRequestSuccess,
};
