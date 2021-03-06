require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('./configs/db.config');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + "/views/partials");

app.locals.title = 'Bird-e';

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: false
  })
);

const User = require('./models/User.model.js');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(null, user._id));

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});

passport.use(
  new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },

    (username, password, done) => {
      User.findOne({
          username
        })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'Incorrect username'
            });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {
              message: 'Incorrect password'
            });
          }

          done(null, user);
        })
        .catch(err => (err));
    }
  )
);

const index = require('./routes/index');
app.use('/', index);
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);
const birdRoutes = require('./routes/birds.routes');
app.use('/', birdRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

module.exports = app;