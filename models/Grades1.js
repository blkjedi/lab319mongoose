import mongoose from "mongoose";

const gradesSchema = new mongoose.Schema({
  scores: 
    [{
    type: {
      type: String,
      enum: ["quiz", "exam", "homework"],
    },
    score: Number}]
  ,
  class_id: {
    type: Number,
  },
  learner_id: {
    type: Number,
  },
});

export default new mongoose.model("Grades", gradesSchema);
