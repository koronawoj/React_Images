const Authentication = require('./controllers/authentication');
const cardController = require('./controllers/cardController');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'Secret key is abc123'});
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.post('/addcard', cardController.createCard);
  app.get('/getcards', cardController.getCards);
  app.get('/getcards/:_id', cardController.getUserCards);
  app.delete('/deletecard/:_id', cardController.deleteCard);
  app.patch('/update/:_id', cardController.updateCard);



}
