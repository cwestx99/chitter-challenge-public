import express from "express";
import userModel from "../models/user.model.js";
import { check, validationResult } from "express-validator";

export const router = express.Router();

router.post("/",
    [
        check("firstName")
            .isLength({ min: 1 })
            .withMessage("please enter your first name"),

        check("lastName")
            .isLength({ min: 1 })
            .withMessage("please enter your last name"),

        check("userName")
            .isLength({ min: 3 })
            .withMessage("your username must have minimum length of 3")
            .custom(async (userName) => {
                const existingUser =
                    await userModel.findOne({ userName })
                if (existingUser) {
                    throw new Error()
                }
            })
            .withMessage("username already in use")
            .trim(),

        check("email")
            .isEmail()
            .withMessage("invalid email address")
            .custom(async (email) => {
                const existingUser =
                    await userModel.findOne({ email })
                if (existingUser) {
                    throw new Error()
                }
            })
            .withMessage("email already in use")
            .normalizeEmail(),

        check("password")
            .isLength({ min: 8, max: 15 })
            .withMessage("your password should have min and max length between 8-15")
            .matches(/\d/)
            .withMessage("your password should have at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("your password should have at least one special character"),

        check("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("confirm password does not match");
            }
            return true;
        }),
    ],
    async (req, res) => {
        const user = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = errors.array();
            res.status(400).send({ error })
        } else {
            const newUser = new userModel(user);
            await newUser.save()
                .then(user => {
                    res.status(201).send({ message: "Successful registration.", user });
                })
                .catch(error => res.status(400).send(error.message));
        }
    });