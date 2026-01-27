const User = require("../models/user.model");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.json());

const signup = async (req, res, next) => {
    try {
        console.log("📥 SignUp request received with body:", req.body);
        const { fullname, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist) {
            console.log("⚠️ User already exists:", email);
            return res.status(400).send({ msg: "User already exist" });
        }

        console.log("🔄 Creating user in database...");
        const userCreated = await User.create({ 
            fullname, 
            email, 
            phone, 
            password 
        });
        
        console.log("✅ User created successfully:", userCreated._id);

        res.status(201).send({ 
            msg: userCreated, 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString()
        });
    }
    catch(error) {
        console.error("❌ Error in SignUp: ", error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const userExist = await User.findOne({ email });

        if(!userExist) {
            return res.status(400).send({ msg: "Invalid credentials"});
        }

        // const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        const isPasswordMatch = await userExist.comparePassword(password);

        if(isPasswordMatch) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        } else {
            res.status(401).json({ msg: "Invalid Email or Password" });
        }
    }
    catch(error) {
        console.error("Error in login: ", error);
        next(error);
    }
};

module.exports = { signup, login };
