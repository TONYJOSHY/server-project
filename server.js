const express = require('express');
const hbs = require("hbs");
const fs = require("fs");

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear()
});


app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${ now } ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile("server.log", log +"\n", (err) =>{
   if(err){
     console.log(err);}
 });
  next();
});

//  app.use( (req, res, next) => {
//   res.render('maintain.hbs')
// }); 

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log("Server running at port 3000")
});