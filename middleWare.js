const express = require("express");

const app = express();

app.use((req, res, next) => {
  req.body = "hey how are you first time";
  next();
});

app.use((req, res, next) => {
  console.log(req.body);
  req.body = "hey how is it going second time";
  next();
});

app.get("/home", (req, res) => {
  console.log(req.body);
  return res.end("this is working properly");
});

app.listen(11111, () => {
  console.log("the server is ready to  work!");
});
