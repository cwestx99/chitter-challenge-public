import mongoose from "mongoose";
import { userSchema } from "./user.model.js"

export const replySchema = new mongoose.Schema({
    peepID: {
        type: Number,
    },

    author: {
        type: userSchema

    },

    message: {
        type: String
    },

    timeStamp: {
        type: Date,
        default: Date.now
    },


});

const replyModel = mongoose.model("reply", replySchema)

export default replyModel;