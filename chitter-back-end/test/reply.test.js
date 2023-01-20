import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import peepModel from "../models/peep.model.js";

chai.use(chaiHttp);

describe("peep tests", () => {

    beforeEach(async () => {
        const testPeep = {
            _id: "63964403dc62e41f85070d09",
            author: "Kanan",
            message: "If All I Do Is Try, That Means I Don't Truly Believe That I Can Succeed."
        }
        await peepModel.deleteMany();
        await peepModel.insertMany(testPeep)
    });

    it("should make successful put request to /replyPeep", async () => {

        const testReply = {
            id: "63964403dc62e41f85070d09",
            reply: "Ezra"
        }
        const res = await chai.request(server).put("/replyPeep").send(testReply);
        console.log(res)
        expect(res).to.have.status(201);
    });


});