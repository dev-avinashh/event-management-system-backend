import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const signUpHandler = async (req, res) => {
  try {
    const { name, email, password, role, profile_picture } = req.body;

    let userEmail = await userModel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let userName = await userModel.findOne({ name });
    if (userName) {
      return res.status(400).json({ message: "Name already exists" });
    }

    let userData = new userModel({
      name,
      email,
      password,
      role,
      profile_picture,
    });
    await userData.save();
    return res
      .status(201)
      .json({ message: "User created Successfully", userData });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userEmail = await userModel.findOne({ email });
    if (!userEmail)
      return res.status(400).json({ message: "Email Does not exist" });

    let userPassword = await userModel.comparePassword(password);

    if (!userPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "100h",
    });

    return res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
