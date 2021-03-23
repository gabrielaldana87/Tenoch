const express = require("express");
const app = express();
const root = require('./routes/root.js');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const session = require('express-session');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'ldap secret', resave: true, saveUninitialized: true}));

const log4js = require('log4js');
const log4jsconfig = require('./log4js-config.json');
log4js.configure(log4jsconfig);

const logger = log4js.getLogger();
// logger.level = 'debug'; // default level is OFF - which means no logs at all.

app.use(express.json());
// IN DEVELOPMENT REMOVE THE FOLLOWING LINES
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nypnodedev.sis.nyp.org:4080"); // update to match the domain
  // you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended : true }));
app.use(passport.initialize());
app.use(passport.session());

console.log('[DEBUG] before calling api...');
logger.debug('before calling api...');
app.use('/users', root() );

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
