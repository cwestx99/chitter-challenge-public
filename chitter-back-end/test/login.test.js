import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import userModel from "../models/user.model.js";
import sampleUsers from "./mock-data/sampleUsers.json" assert {type: "json"}

chai.use(chaiHttp);

describe("authentication tests", () => {

    beforeEach(async () => {
        await userModel.deleteMany();
        await userModel.insertMany(sampleUsers);
    });

    it("should make successful post request to /login", async () => {
        let testLogin = {
            userName: "hohnaka",
            password: "ezra.123"
        }
        const res = await chai.request(server).post("/login").send(testLogin);

        expect(res).to.have.status(200);
    });

    it("should login successfully", async () => {
        let testLogin = {
            "userName": "hohnaka",
            "password": "ezra.123"
        }
        const res = await chai.request(server).post("/login").send(testLogin);

        expect(res.text).to.contain("Successful login.");
    });

    it("should fail if the supplied password is incorrect", async () => {
        let testLogin = {
            "userName": "hohnaka",
            "password": "chopper.123"
        }
        const res = await chai.request(server).post("/login").send(testLogin);

        expect(res).to.have.property("error");
        expect(res.text).to.contain("Login Failed: Log in credentials are incorrect.");
    });

    it("should fail if the supplied userName is incorrect", async () => {
        let testLogin = {
            "userName": "sabine",
            "password": "ezra.123"
        }
        const res = await chai.request(server).post("/login").send(testLogin);

        expect(res).to.have.property("error");
        expect(res.text).to.contain("Login Failed: Log in credentials are incorrect.");
    });

});