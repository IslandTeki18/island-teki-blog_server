import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

//@desc     Get Auth User and Token
//@route    POST /api/users/login
//@access   Public
const postAuthUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(404).send({ msg: "User not found." });

    if (await user.matchPassword(req.body.password)) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Invalid Username or Password!");
    }
  } catch (error) {
    res.status(401);
    next(error);
  }
};

//@desc     Get admin profile
//@route    GET /api/users/profile
//@access   Private
const getAdminProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Update User Settings
//@route    PUT /api/users/profile/settings
//@access   Private/Admin
const putUpdateAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedAdmin = await user.save();

    res.json({
      _id: updatedAdmin._id,
      username: updatedAdmin.username,
      isAdmin: updatedAdmin.isAdmin,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { postAuthUser, getAdminProfile, putUpdateAdmin };
