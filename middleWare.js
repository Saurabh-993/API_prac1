const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.customProperty = `for every request 1st middleware will hold the method ${req.method}`; //note using the previous way was bit risky as the req.body and res.body are important for internal working of the express , here the code was simple that's why they run without any problem.
  console.log("first middleware run and remember the calling method");
  next();
});

app.use((req, res, next) => {
  res.customProperty += `\n for every request 2nd middleware will hold the date ${new Date().toISOString()}`; //now we have created a customProperty and you can name it anything as it is stored inside the response body
  next();
});

app.get("/home", (req, res) => {
  return res.end(
    ` this is the response body that is set by first and second middleware \n ${res.customProperty}`, //just a code for the user so we can check the logic of middlewares.
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
