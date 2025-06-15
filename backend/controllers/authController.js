import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../config/GenereteToken.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate JWT token
    console.log(1)
    
 const token= generateToken(user._id, res);
    console.log(2)
    res.status(201).json({ user,token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login an existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token= generateToken(user._id, res);
    console.log(2)
    res.status(201).json({ user,token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout a user
export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge:0})
    // Set to true if using HTTPS)


  try {
    // Add the token to the 
   r

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const  checkAuth=(req,res)=>{
  try{
      res.status(200).json(req.user)
  }
  catch(error){
      console.log("error in check auth controller",error.message)
      return res.status(500).json({message:"Internal server error"})
  }
}