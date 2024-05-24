import User from "../models/user.medel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    const exitingUsername = await User.findOne({ username });
    if (exitingUsername) {
      return res
        .status(400)
        .json({ error: "Username already taken , try diffrent One!" });
    }

    const exitingEmail = await User.findOne({ email });
    if (exitingEmail) {
      return res.status(400).json({
        error: "email Address  already registerd , try diffrent One!",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Passwrod must be 6 character logn!" });
    }

    //hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // console.log(newUser._id);
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: fullName,
        username: username,
        email: email,
        follower: newUser.follower,
        following: newUser.following,
        profileImage: newUser.profileImage,
        coverImage: newUser.coverImage,
      });
    } else {
      res.status(400).json({ error: "Invalid user darta" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordValid = await bcrypt.compare(password, user.password || "");

    if (!user || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid user or Password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      follower: user.follower,
      following: user.following,
      profileImage: user.profileImage,
      coverImage: user.coverImage,
    });
  } catch (error) {
    console.log("Error in signin controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.statut(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser controller", error.message);
    res.statut(500).json({ error: "Internal server error" });
  }
};
