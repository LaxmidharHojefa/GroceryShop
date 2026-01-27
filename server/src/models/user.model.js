const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Invalid phone number"],
        },
        password: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);


// hash the password before saving the user
userSchema.pre("save", async function (next) {
    const user = this;

    if(!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
        next();
    } catch(error) {
        console.log("Error in hashing password: ", error);
    }
})

// comapre password method
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

// generate web token
userSchema.methods.generateToken = async function () {
    // Header
    // Payload
    // Signature

    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }

    return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        }
    );
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
