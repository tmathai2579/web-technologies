const mongoose = require('mongoose');

// To define the schema
const programmingLanguageSchema  = new mongoose.Schema({
    name: String,
    author: String,
    yearOfRelease: Number,
    latestVersion: String,
    website: String
  });

// To create the model using defined Schema
const ProgrammingLanguage = mongoose.model('ProgrammingLanguage', programmingLanguageSchema);

module.exports = ProgrammingLanguage;