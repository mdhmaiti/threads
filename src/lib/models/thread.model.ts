import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",// it is a reference to it self , so that one thread can have multiple threads as its children.
    },
  ],
});

// The mongoose.models.Thread checks if a Mongoose model with the name "Thread" already exists in the Mongoose registry. If it does, it uses that existing model.
// If the "Thread" model doesn't exist, it creates a new model using mongoose.model("Thread", threadSchema).
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

// original thread 
//   ->thread comment 1
//   ->thread comment 2
//     ->thread comment 3

export default Thread;