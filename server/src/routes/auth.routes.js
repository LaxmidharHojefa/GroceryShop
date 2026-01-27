const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { signupSchema, loginSchema } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");

// auth routers
router.get("/", (req, res) => {
    res.status(200).send("Home page of auth-router");
});

// router.get("/", home);
// router.post("/signup", validate(signupSchema), signup);
// router.post("/login", validate(loginSchema), login);
router.post("/login", login);
router.post("/signup", signup);
module.exports = router;



