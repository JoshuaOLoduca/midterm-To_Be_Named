// setup

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');

app.set('view engine', 'ejs');

app.use(cookieSession({
  name: "session",
  keys: ['key1', 'key2'],
}));

app.use(bodyParser.urlencoded({ extended: true }));

//  render index page
app.get('/', (req, res) => {
  res.render('index');
});

// GET /users/login
app.get('/login/:id', (req, res) => {
  // cookie credentials
  //req.session.user_id = req.params.id;

  // redirect to homepage
  res.redirect('/');
});

// POST /users/logout
app.post('/logout', (req, res) => {
  // clear cookies
  req.sessions = null;

  // redirect to homepage
  res.redirect('/');
});

