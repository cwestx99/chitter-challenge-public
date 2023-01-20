import express from "express";
import peepModel from "../models/peep.model.js";
import replyModel from "../models/reply.model.js";



export const router = express.Router();

router.put("/", async (req, res) => {
    const id = req.body.peepID;
    const peep = await peepModel.findById(id);
    const reply = new replyModel(req.body)
    peep.reply.push(reply)
    const updatedPeep = new peepModel({
        _id: id,
        author: peep.author,
        name: peep.name,
        message: peep.message,
        timeStamp: peep.timeStamp,
        reply: peep.reply
    })

    try {

        const addReply = await peepModel.findByIdAndUpdate(id, updatedPeep);
        res.status(201).json({ addReply })
    } catch (error) {
        error = "Cannot reply to peep"
        res.status(404).send(error)
    }
});