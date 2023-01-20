import mongoose from "mongoose";
import { replySchema } from "./reply.model.js"
import { userSchema } from "./user.model.js";

const peepSchema = new mongoose.Schema({
    author: {
        type: userSchema
    },
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    reply: {
        type: [replySchema],
        default: []

    }
});

const peepModel = mongoose.model("peeps", peepSchema)

export default peepModel;
