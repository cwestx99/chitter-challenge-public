import express from "express";
import userModel from "../models/user.model.js";

export const router = express.Router();

router.post("/", (req, res) => {
    const { userName, password } = req.body;

    userModel.findOne({ userName }, (error, user) => {
        if (user && password === user.password) {
            res.status(200).send({ message: "Successful login.", user });
        }
        else {
            error = { message: "Login Failed: Log in credentials are incorrect." }
            res.status(401).send(error);
        }
    });
});