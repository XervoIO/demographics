'use strict'

const Mongoose = require('mongoose')
const Timestamps = require('mongoose-timestamp')

let Project = new Mongoose.Schema({
  name: { type: String, required: true, index: true },
  maintainers: { type: Array, default: [] },
  description: { type: String },
  hasLinter: { type: Boolean, default: false },
  hasReadme: { type: Boolean, default: false },
  versions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Version' }]
})

Project.plugin(Timestamps)

module.exports = Mongoose.model('Project', Project)
