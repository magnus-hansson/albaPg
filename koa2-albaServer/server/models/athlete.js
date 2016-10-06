import mongoose from 'mongoose'

const Schema = mongoose.Schema

const athleteSchema = new Schema({
  name: String,
  emails: [String],
  phones: [String],
  //activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  updated: { type: Date, default: Date.now },
  recentactivity: String
})

export default mongoose.model('Athlete', athleteSchema)
