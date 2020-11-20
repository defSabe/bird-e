const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');

router.get('/signup', (req, res, next) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!username || !email || !password) {
    res.render('auth/signup', {
      errorMessage: 'All fields are mandatory'
    });
    return;
  }

  User.findOne({
      username
    })
    .then(user => {

      if (user !== null) {
        res.render('auth/signup', {
          message: 'The username already exists'
        });
        return;
      }

      const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      if (!strongPasswordRegex.test(password)) {
        res.status(500).render("auth/signup", {
          email,
          username,
          errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPass
      });

      newUser
        .save()
        .then(() => res.redirect('/birds'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.get('/login', (req, res, next) => res.render('auth/login'));

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/birds');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;