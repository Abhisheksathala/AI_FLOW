
const mongoose = require("mongoose");


const conversationSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true, 
    },
    response: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);


const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);


module.exports  = Conversation;