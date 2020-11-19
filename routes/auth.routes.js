
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
        // Strong password pattern.
        const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

        // Validate that incoming password matches regex pattern.
        if (!strongPasswordRegex.test(password)) {
        res.status(500).render("auth/signup", {
            email,
            username,
            errorMessage:
            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
            });
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
          .then(() => res.redirect('/birds'))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });
// GET Login
router.get('/login', (req, res, next) => res.render('auth/login'));

// POST Login
router.post('/login', passport.authenticate('local'), (req, res) => {
        console.log("success")
        res.redirect('/birds')
        // successRedirect: '/test',
        //failureRedirect: '/login'
    });


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });  

module.exports = router;