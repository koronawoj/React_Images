const Card = require('../models/card');
const User = require('../models/user');
const Image = require('../models/image');


module.exports = {

  createCard: async (req, res, next) => {

   const owner = await User.findById(req.body.owner);

    const newImage = req.body;
   delete newImage.owner;
    const image = new Image(newImage);

   image.owner = owner;
    await image.save();
   owner.images.push(image);

   await owner.save();
    res.status(200).json({ success: "New card" });


  },
  getCards: async (req, res, next) => {

    const images = await Image.find({});
    res.status(200).json(images);

  },
  deleteCard: async (req, res, next) => {
      const { _id } = req.params;
      const image = await Image.findById(_id);
      console.log(_id);

      if(!image) {
        return res.status(404).json({ error: 'image doesnt exist'})
      }

      const ownerId = image.owner;
      const owner = await User.findById(ownerId);

      await image.remove();
      owner.images.pull(image);
      await owner.save();


      res.status(200).json({ success: true });

  },

  updateCard: async (req, res, next) => {
      const { _id } = req.params;
      const { favourite } = req.body;
      const image = await Image.findByIdAndUpdate(_id, {favourite: favourite});
      console.log(favourite);

      if(!image) {
        return res.status(404).json({ error: 'image doesnt exist'})
      }



      res.status(200).json(image);

  },

  getUserCards: async (req, res, next) => {
    const { _id } = req.params;
    console.log("to jest id: ", _id);
    const user = await User.findById(_id).populate('images');

    res.status(200).json(user.images);
  },


}

// exports.createCard = function(req, res, next){
//   const title = req.body.title;
//   const description = req.body.description;
//   const imageURL = req.body.imageURL;
//
//   if (!title || !description || !imageURL) {
//     return res.status(422).send({error: 'You must provide title and description'});
//   }
//
//   const card = new Card({
//     title: title,
//     description: description,
//     imageURL: imageURL
//   });
//
//   card.save(function(err) {
//     if (err) {return next(err); }
//     // Repod to request indicating the user was created
//     res.json({ success: "New card" });
//   });
//
// }
//
//
// exports.getCards = function(req, res, next){
//   Card.find({}, function(err, cards) {
//     var cardMap = {};
//
//     cards.forEach(function(card) {
//       cardMap[card._id] = card;
//     });
//
//     res.send(cardMap);
//   });
//
// }
//
// //MyModel.findOneAndRemove({field: 'newValue'}, function(err){...});
//
// exports.deleteCard = function(req, res, next){
//   Card.findOneAndRemove({ _id: req.params._id}, (err, res) => {
//     if (err) {
//       console.log(err);
//       return
//     }
//
//   })
//   Card.find({}, function(err, cards) {
//     var cardMap = {};
//
//     cards.forEach(function(card) {
//       cardMap[card._id] = card;
//     });
//
//     res.send(cardMap);
//   });
// }


//
// app.delete('/api/games/:_id', (req, res) => {
//   db.collection('games').deleteOne({ _id: new mongodb.ObjectId(req.params._id)}, (err, r) => {
//     if (err) {res.status(500).json({ errors: {global: err }}); return;}
//
//     res.json({});
//   })
// })
