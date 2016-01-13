import Mongoose, {Schema} from 'mongoose'

let Project = new Schema({
  name: { type: String, required: true, index: true },
  maintainers: { type: Array, default: [] },
  description: { type: String },
  hasLinter: { type: Boolean, default: false },
  hasReadme: { type: Boolean, default: false }
})

export default Mongoose.model('Project', Project)
