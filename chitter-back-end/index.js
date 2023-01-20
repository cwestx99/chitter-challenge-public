import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { router as register } from "./routes/register.js";
import { router as postPeep } from "./routes/postPeep.js";
import { router as getPeeps } from "./routes/getPeeps.js";
import { router as login } from "./routes/login.js";
import { router as replyPeep } from "./routes/replyPeep.js";

config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const host = process.env.HOST;
mongoose.set("strictQuery", true);
const app = express();

const main = async () => {
    console.log(`Connecting to Database: ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to Database: ${process.env.DB_URI}`);
}

main().catch(error => console.log(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", getPeeps)
app.use("/register", register)
app.use("/postPeep", postPeep)
app.use("/login", login)
app.use("/replyPeep", replyPeep)



const server = app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});

export default server;