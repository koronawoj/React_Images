const jwt = require('jwt-simple');
const User = require('../models/user');
const { encrypt } = require('../models/user');
const Image = require('../models/image');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = {

  signin: async (req, res, next) => {

    var user = await User.findOne({ email: req.body.email});
    res.send({token: tokenForUser(req.user),
      userId: user._id });
  },

  signup: async (req, res, next) => {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
      }

      User.findOne({ email: email}, function(err, existingUser){
        if (err) {return next(err); }

        //If a user with email does exist, return an error
        if (existingUser) {
          return res.status(422).send({
            error: 'Email is in use'
        });
        }

          // If a user with email does not exist, create and save recerd
          const user = new User({
            email: email,
            password: password,
          });
          user.save(function(err) {
            if (err) {return next(err); }
            // Repod to request indicating the user was created
            res.json({ token: tokenForUser(user),
            userId: user._id});
          });

        });
  },

// exports.signin = function(req, res, next){
//   //User has already had their email and passpord auth'd
//   //just need to give them a token
//
//   res.send({token: tokenForUser(req.user) });
// }
//
// exports.signup = function(req, res, next){
//   const email = req.body.email;
//   const password = req.body.password;
//
//   if (!email || !password) {
//     return res.status(422).send({error: 'You must provide email and password'});
//   }
//
//   //See if a user with the given email exists
//
//   User.findOne({ email: email}, function(err, existingUser){
//     if (err) {return next(err); }
//
//     //If a user with email does exist, return an error
//     if (existingUser) {
//       return res.status(422).send({
//         error: 'Email is in use'
//     });
//     }
//
//     // If a user with email does not exist, create and save recerd
//     const user = new User({
//       email: email,
//       password: password
//     });
//     user.save(function(err) {
//       if (err) {return next(err); }
//       // Repod to request indicating the user was created
//       res.json({ token: tokenForUser(user) });
//     });
//
//   });
//
//
//
// }
}
