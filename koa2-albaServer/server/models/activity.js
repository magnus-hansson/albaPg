import mongoose from 'mongoose'

const Schema = mongoose.Schema

const activitySchema = new Schema({
    name: String,
    description: String,
    location: String,
    date: Date,
    start: String,
    end: String,
    starttime: String,
    endtime: String,
    athletes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Athlete' }],
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    slots: Number
})

export default mongoose.model('Activity', activitySchema)

