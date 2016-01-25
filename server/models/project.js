'use strict';

const Mongoose = require('mongoose');
const Timestamps = require('mongoose-timestamp');

const Project = new Mongoose.Schema({
  name: { type: String, required: true, index: true },
  maintainers: { type: Array, default: [] },
  description: { type: String },
  hasLicense: { type: Boolean, default: false },
  hasLinter: { type: Boolean, default: false },
  hasReadme: { type: Boolean, default: false },
  engines: {
    npm: { type: String, default: '0.0.0' },
    node: { type: String, default: '0.0.0' }
  },
  versions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Version' }]
});

Project.plugin(Timestamps);

module.exports = Mongoose.model('Project', Project);
