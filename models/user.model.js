import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import bcryptjs from "bcryptjs"
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["organizer", "attendee"],
    required: true,
  },
  profile_picture: {
    type: String,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    required: false,
  },
});



user.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Verify password
  user.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  export const userModel = mongoose.model('User',user)
  
