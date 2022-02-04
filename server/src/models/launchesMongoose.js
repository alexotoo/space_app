import mongoose from "mongoose";
const { Schema } = mongoose;

const launchSchema = new Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model("Launch", launchSchema);
