import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "userModel", 
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "eventModel", 
      required: true,
    },
    registration_date: {
      type: Date, 
      default: Date.now, 
    },
    payment_status: {
      type: String,
      enum: ["Paid", "Unpaid", "Free"], 
      required: true,
    },
    ticket_number: {
      type: String, 
      unique: true, 
      required: true,
    },
  },
  { timestamps: true } 
);

export const eventRegistrationModel = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);
