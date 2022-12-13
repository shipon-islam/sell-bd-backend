//@Date: 01/10/2022
//@Author: Shipon islam

const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

//external import
const userModel = require("../models/usersModel");
const { generateToken } = require("../utilites/generateJwtToken");
const { unlinkImage } = require("../utilites/UnlinkFile");

//@Desc:Register new user          @Route: user/register
//@Access: Public                  @Method: POST
const registerUsers = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400);
      res.json({ message: "you can't blank any field" });
    }
    //matching user
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      res.json({ message: "user all ready exist" });
    }
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const user = await userModel.create({
      avatar: `https://sellbdapi.onrender.com/images/avatar.png`,
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

//@Desc:login user                 @Route: user/login
//@Access: Public                  @Method: POST
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201);
      res.json({
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        _id: user._id,
      });
    } else {
      next("invalid creadential");
    }
  } catch (error) {
    next(error);
  }
};

//@Desc:get authenticate user       @Route: user/get/me
//@Access: Private                  @Method:GET
const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });

    res.send(user);
  } catch (error) {
    next(error);
  }
};
//@Desc:get authenticate user       @Route: user/update
//@Access: Private                  @Method:put
const userUpdate = async (req, res, next) => {
  const { newPassword, oldPassword, email } = req.body;

  try {
    let obj;
    if (req.files && req.files.length > 0) {
      obj = {
        avatar: `${req.protocol}://${req.get("host")}/images/avatar/${
          req.files[0].filename
        }`,
      };
    } else {
      const user = await userModel.findOne({ email });

      if (user && (await bcrypt.compare(oldPassword, user.password))) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        obj = {
          password: hashedPassword,
        };
      } else {
        next("old password not match");
      }
    }

    const updateUser = await userModel.findOneAndUpdate({ email }, obj);
    if (req.files && req.files.length > 0 && updateUser) {
      unlinkImage([updateUser.avatar], "public/images/avatar");
    }

    res.send("end");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUsers,
  getMe,
  userLogin,
  userUpdate,
};
