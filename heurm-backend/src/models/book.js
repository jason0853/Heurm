const mongoose = require('mongoose');
const { Schema } = mongoose;

const Author = new Schema({
  name: String,
  email: String
});

const Book = new Schema({
  title: String,
  authors: [Author],
  publishedDate: Date,
  price: Number,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Book.statics.create = function({ title, authors, publishedDate, price, tags }) {
  const book = new this({
    title,
    authors,
    publishedDate,
    price,
    tags
  });

  return book.save();
};

Book.statics.list = function() {
  return this.find();
};

Book.statics.get = function(id) {
  return this.findById(id);
};

Book.statics.remove = function(id) {
  return this.findByIdAndRemove(id);
};

Book.statics.replace = function(id, updateInfo) {
  return this.findByIdAndUpdate(id, updateInfo, { upsert: true, new: true });
};

Book.statics.update = function(id, updateInfo) {
  return this.findByIdAndUpdate(id, updateInfo, { new: true });
};

module.exports = mongoose.model('Book', Book);
