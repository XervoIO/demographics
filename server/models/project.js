import Mongoose, {Schema} from 'mongoose'
import Timestamps from 'mongoose-timestamp'

let Project = new Schema({
  name: { type: String, required: true, index: true },
  maintainers: { type: Array, default: [] },
  description: { type: String },
  hasLinter: { type: Boolean, default: false },
  hasReadme: { type: Boolean, default: false },
  versions: [{ type: Schema.Types.ObjectId, ref: 'Version' }]
})

Project.plugin(Timestamps)

export default Mongoose.model('Project', Project)
