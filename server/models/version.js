'use strict';

const Mongoose = require('mongoose');
const Timestamps = require('mongoose-timestamp');

const Version = new Mongoose.Schema({
  name: { type: String, required: true, index: true },
  version: { type: String, required: true, index: true },
  loc: { type: Number, required: true },
  coverage: { type: Number, required: true },
  dependencies: {
    major: { type: Number },
    minor: { type: Number },
    upToDate: { type: Number }
  },
  devDependencies: {
    major: { type: Number },
    minor: { type: Number },
    upToDate: { type: Number }
  }
});

Version.plugin(Timestamps);

module.exports = Mongoose.model('Version', Version);
