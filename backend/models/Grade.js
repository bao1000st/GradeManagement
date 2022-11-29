const mongoose = require('mongoose')
const Schema = mongoose.Schema

let gradeSchema = new Schema(
  {
    studentId: {
      type: String,
    },
    name: {
      type: String,
    },
    course: {
      type: String,
    },
    score: {
      type: Number,
    }
  },
  {
    collection: 'grades',
  },
)

module.exports = mongoose.model('Grade', gradeSchema)
