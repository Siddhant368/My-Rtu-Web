import User from "../models/User.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= SIGNUP =================
export const signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // CHECK USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({

      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({

      message: "Signup Successful",
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // TOKEN
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({

      message: "Login Successful",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};