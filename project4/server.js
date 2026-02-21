// import library into a variable
const express = require("express");

// create an instance of an Express application
const app = express();

// here are the middleware
// tell the server to find html, js, css from the public folder (server >> client)
app.use(express.static("public"));
app.use(express.json());

// allow the server to process data sent from html (client >> server)
app.use(express.urlencoded({ extended: true }));

// setting up my first handler for a route
app.get("/", (request, response) => {
  response.send("<h1>my server is live!</h1>");
});


let blessings = [];

app.post("/post", (request, response) => {
  const message = request.body.message;

  blessings.push(message);

  // redirect the response onto homepage 
  response.redirect("/");
});

app.get("/all-blessings", (request, response)=>{
  response.json({ blessings });
});

// start the server 
app.listen(5500, () => {
  console.log("server is running!");
});

