import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      required: true,
      trim: true,
    },
    description: {
      type: String, 
      required: true,
      trim: true,
    },
    event_date: {
      type: Date, 
      required: true,
    },
    location: {
      type: String, 
      required: true,
      trim: true,
    },
    ticket_price: {
      type: Number, 
      required: true,
      trim: true,
    },
    max_capacity: {
      type: Number, 
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel", 
      required: true, 
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userModel",
      },
    ],
  },
  { timestamps: true }
);

export const eventModel = mongoose.model("Event", eventSchema);
