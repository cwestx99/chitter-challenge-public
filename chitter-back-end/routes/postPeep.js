import express from "express";
import peepModel from "../models/peep.model.js";
import { check, validationResult } from "express-validator";

export const router = express.Router();

router.post("/",
    [
        check("message")
            .isLength({ min: 1, max: 280 })
            .withMessage("A peep must be more than 1 and less than 280 characters.")
    ],


    (req, res) => {
        const peep = req.body;
        const newPeep = new peepModel(peep);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = errors.array();
            res.status(400).send({ error })
        } else {
            newPeep.save()
                .then(peep => {
                    res.status(201).json(peep);
                })
                .catch(error => res.status(400).send(error.message));
        }
    });