import Mongoose, {Schema} from 'mongoose'
import Timestamps from 'mongoose-timestamp'

let Version = new Schema({
  name: { type: String, required: true, index: true },
  version: { type: String, required: true, index: true },
  loc: { type: Number, required: true },
  coverage: { type: Number, required: true },
  dependencies: {
    major: { type: Number },
    minor: { type: Number },
    uptoDate: { type: Number }
  },
  devDependencies: {
    major: { type: Number },
    minor: { type: Number },
    uptoDate: { type: Number }
  }
})

Version.plugin(Timestamps)

export default Mongoose.model('Version', Version)
