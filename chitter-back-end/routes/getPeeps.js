import express from "express";
import peepModel from "../models/peep.model.js";
export const router = express.Router();

router.get("/getPeeps", (req, res) => {
    peepModel.find({}, (error, result) => {
        error ?
            res.json(error)
            :
            res.json(result);

    });
});