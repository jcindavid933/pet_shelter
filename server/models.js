const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pet');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var PetSchema = new mongoose.Schema({
  name: {type: String, required: [true, "All Pets must have a name!"], minlength: [3, "Must be at least 3 characters long"]},
  type: {type: String, required: [true, "All Pets must have a type!"], minlength: [3, "Must be at least 3 characters long"]},
  desc: {type: String, required: [true, "All Pets must have a description!"], minlength: [3, "Must be at least 3 characters long"]},
  skill1: {type: String},
  skill2: {type: String},
  skill3: {type: String},
  like: {type: Number, default: 0}
}, {timestamps: {created_at: 'created_at', updated_at: 'updated_at'}});

mongoose.model('Pet', PetSchema);

module.exports = mongoose.model('Pet');
