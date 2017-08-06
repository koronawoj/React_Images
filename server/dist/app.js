(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Hold aplication secrets and configs
module.exports = {
  secret: 'dfcgvhbjnkm'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;
var bcrypt = __webpack_require__(16);

//Define model

var userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
// Before saving a  model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  var user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash (encrypt) password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

//Create the model class
var ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Authentication = __webpack_require__(11);
var cardController = __webpack_require__(12);
var passportService = __webpack_require__(15);
var passport = __webpack_require__(3);

var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Secret key is abc123' });
  });
  app.get('/test', function (req, res) {
    res.send("Działa");
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.post('/addcard', cardController.createCard);
  app.get('/getcards', cardController.getCards);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(17);
var User = __webpack_require__(2);
var config = __webpack_require__(1);

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  //User has already had their email and passpord auth'd
  //just need to give them a token

  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  //See if a user with the given email exists

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    //If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use'
      });
    }

    // If a user with email does not exist, create and save recerd
    var user = new User({
      email: email,
      password: password
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      // Repod to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Card = __webpack_require__(14);

exports.createCard = function (req, res, next) {
  console.log(req.body);
  var title = req.body.title;
  var description = req.body.description;
  var imageURL = req.body.imageURL;

  if (!title || !description || !imageURL) {
    return res.status(422).send({ error: 'You must provide title and description' });
  }

  var card = new Card({
    title: title,
    description: description,
    imageURL: imageURL
  });

  card.save(function (err) {
    if (err) {
      return next(err);
    }
    // Repod to request indicating the user was created
    res.json({ success: "New card" });
  });
};

exports.getCards = function (req, res, next) {
  Card.find({}, function (err, cards) {
    var cardMap = {};

    cards.forEach(function (card) {
      cardMap[card._id] = card;
    });

    res.send(cardMap);
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Maint starting point
var express = __webpack_require__(8);
var http = __webpack_require__(9);
var bodyParser = __webpack_require__(6);
var morgan = __webpack_require__(10);
var router = __webpack_require__(5);
var mongoose = __webpack_require__(0);
var cors = __webpack_require__(7);

var app = express();
//DB Setup
mongoose.connect('mongodb://mo1063_auth:qWe123@mongo15.mydevil.net:27017/mo1063_auth');
// mongoose.connect('mongodb://auth.koronawoj.pl:mongo15.mydevil.net/mo1063_auth');
// mongoose.connect('mongodb://localhost:app/app');
// mongodb://<dbuser>:<dbpassword>@ds127260.mlab.com:27260/todo
//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup

var port = process.env.PORT || 3090;
var server = http.createServer(app);
server.listen(port);

console.log('server listening on: ', port);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;

//Define model

var cardSchema = new Schema({
  title: String,
  description: String,
  imageURL: String
});

//Create the model class
var ModelClass = mongoose.model('card', cardSchema);

//Export the model
module.exports = ModelClass;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(3);
var User = __webpack_require__(2);
var config = __webpack_require__(1);
var JwtStrategy = __webpack_require__(4).Strategy;
var ExtractJwt = __webpack_require__(4).ExtractJwt;
var LocalStrategy = __webpack_require__(18);

//Create local strategy
var localOpctions = { usernameField: 'email' };
var localLogin = new LocalStrategy(localOpctions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, calll done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  //See if the user ID in the payoad exists in our database
  //If it does, call 'done' with that user
  //otherwise, call done withut a user object
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("jwt-simple");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ })
/******/ ])));
