
const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const passport = require('passport');

// GET Signup
router.get('/signup', (req, res, next) => res.render('auth/signup'));

// POST Signup
router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username)
    // Check username, email and password are not empty
    if (!username || !email || !password) {
      res.render('auth/signup', { errorMessage: 'All fields are mandatory' });
      return;
    }
   
    User.findOne({ username })
      .then(user => {
        // Check user does not already exist
        if (user !== null) {
          res.render('auth/signup', { message: 'The username already exists' });
          return;
        }
   
        // Encrypt the password
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
   
        // Save the user in DB
        const newUser = new User({
          username,
          email,
          password: hashPass
        });
        
        newUser
          .save()
          .then(() => res.redirect('/test'))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });
// GET Login
router.get('/login', (req, res, next) => res.render('auth/login'));

// POST Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/test',
    failureRedirect: '/login'
  })
);

// GET test
router.get('/test', (req, res, next) => res.render('users/test'));

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });  

module.exports = router;