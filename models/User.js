// Load required packages
var mongoose = require('mongoose');

// Define our User schema
var UserSchema   = new mongoose.Schema({
  name: {type:String, required: true},
  email: {type:String, required: true,  unique: true},
  pendingTask: {type: [String], default:null},
  dataCreated: {type:Date, default:Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);