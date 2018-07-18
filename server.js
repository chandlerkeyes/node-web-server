const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//param1: the url the user requested, in this case, it's the root url
//param2: what the user will be given back (request and response)

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs', {
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!',
    currentYear: new Date().getFullYear()
  });
   //res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: "You have an error"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
