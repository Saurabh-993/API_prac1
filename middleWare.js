const express = require("express");

const app = express();

app.use((req, res, next) => {
  req.body = `for every request 1st middleware will hold the method ${req.method}`; //note they will not run on the user side as they are just in text format.and their is no client side rendering but we can do this by another method we will se that in the next commit
  console.log("first middleware run and remember the calling method");
  next();
});

app.use((req, res, next) => {
  req.body = `for every request 2nd middleware will hold the date ${new Date().toISOString}`;
  console.log("second middleware runs and capture the time");
  next();
});

app.get("/home", (req, res) => {
  res.body = req.body;
  return res.end(
    ` this is the response body that is set by first and second middleware \n ${res.body}`, //just a code for the user so we can check the logic of middlewares.
  );
});

app.get("/user", (req, res) => {
  return res.status(211).end("what is the status code bro"); //through res.status() we can add the status code on our responses
});

app.listen(11111, () => {
  console.log("the server is ready to  work!");
});
// app.handle(
//   { reqbody: "this is the body of the req" },
//   { resBody: "this is the body of the response" },
//   () => "this basically routes",
// ); //this is a private function of expressJs that's basically provides the route table matches to the other functions like add.get ,add.put etc. but you can't make use of it as it is a way complex.
