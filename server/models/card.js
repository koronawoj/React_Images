const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model

const cardSchema = new Schema({
  title: String,
  description: String,
  imageURL: String
});


//Create the model class
const ModelClass = mongoose.model('card', cardSchema);

//Export the model
module.exports = ModelClass;
