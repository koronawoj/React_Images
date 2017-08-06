const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: String,
  description: String,
  imageURL: String,
  favourite: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Image = mongoose.model('image', imageSchema);
module.exports = Image;
