import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import peepModel from "../models/peep.model.js";

chai.use(chaiHttp);

const mockUser = {
    firstName: "Kanan",
    lastName: "Jarrus",
    email: "kjarrus@dume.com",
    userName: "kjarrus",
    password: "caleb!66",
    confirmPassword: "caleb!66"

}

describe("peep tests", () => {

    beforeEach(async () => {
        await peepModel.deleteMany();
    });

    it("should make successful post request to /postPeep", async () => {
        const testPeep = {
            author: mockUser,
            message: "If All I Do Is Try, That Means I Don't Truly Believe That I Can Succeed."
        }
        const res = await chai.request(server).post("/postPeep").send(testPeep);

        expect(res).to.have.status(201);
    });

    it("should fail post if there are no characters", async () => {
        const testPeep = {
            author: mockUser,
            message: ""
        }
        const res = await chai.request(server).post("/postPeep").send(testPeep);
        expect(res.text).to.contain("A peep must be more than 1 and less than 280 characters.");
    });

    it("should fail post if there are no characters", async () => {
        const testPeep = {
            author: mockUser,
            message: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mass"
        }
        const res = await chai.request(server).post("/postPeep").send(testPeep);
        expect(res.text).to.contain("A peep must be more than 1 and less than 280 characters.");
    });

});