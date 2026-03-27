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

app.handle(
  { reqbody: "this is the body of the req" },
  { resBody: "this is the body of the response" },
  () => "this basically routes",
); //this is a private function of expressJs that's basically provides the route table matches to the other functions like add.get ,add.put etc. but you can't make use of it as it is a way complex.
