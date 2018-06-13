const mongoose = require('mongoose');
const { Schema } = mongoose;

const Person = new Schema({
  name: String,
  age: Number
});

const Profile = new Schema({
  person: Person,
  skills: [String]
});

module.exports = mongoose.model('Profile', Profile);
