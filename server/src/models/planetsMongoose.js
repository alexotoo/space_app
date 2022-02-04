import mongoose from "mongoose";
const { Schema } = mongoose;

const planetSchema = new Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  keplerName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Planet", planetSchema);
