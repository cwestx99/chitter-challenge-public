import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import userModel from "../models/user.model.js";
import sampleUsers from "./mock-data/sampleUsers.json" assert {type: "json"}

chai.use(chaiHttp);

describe("registration tests", () => {

    beforeEach(async () => {
        await userModel.deleteMany();
        await userModel.insertMany(sampleUsers);
    });

    it("should make successful post request to /register", async () => {
        const testRegister = {

            firstName: "Sabine",
            lastName: "Wren",
            email: "swren@vizsla.com",
            userName: "swren",
            password: "mandalore!21",
            confirmPassword: "mandalore!21"
        }
        const res = await chai.request(server).post("/register").send(testRegister);
        expect(res).to.have.status(201);
    });

    it("should register successfully", async () => {
        const testRegister = {
            firstName: "Sabine",
            lastName: "Wren",
            email: "swren@vizsla.com",
            userName: "swren",
            password: "mandalore!21",
            confirmPassword: "mandalore!21"
        }
        const res = await chai.request(server).post("/register").send(testRegister);
        expect(res.text).to.contain("Successful registration.");
    });

    describe("password validation tests", () => {

        it("should fail if the supplied password is less than 8 characters", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swren@vizsla.com",
                userName: "swren",
                password: "e!21",
                confirmPassword: "e!21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.property("error");
            expect(res).to.have.status(400);
            expect(res.text).to.contain("your password should have min and max length between 8-15");
        });

        it("should fail if the supplied password doesn't contain a number", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swren@vizsla.com",
                userName: "swren",
                password: "mandalore!",
                confirmPassword: "mandalore!"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.property("error");
            expect(res).to.have.status(400);
            expect(res.text).to.contain("your password should have at least one number");
        });

        it("should fail if the supplied password doesn't contain a number", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swren@vizsla.com",
                userName: "swren",
                password: "mandalore21",
                confirmPassword: "mandalore21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.property("error");
            expect(res).to.have.status(400);
            expect(res.text).to.contain("your password should have at least one special character");
        });

        it("should fail if the supplied confirmPassword doesn't match", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swren@vizsla.com",
                userName: "swren",
                password: "mandalore!21",
                confirmPassword: "wrongpassword"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.property("error");
            expect(res).to.have.status(400);
            expect(res.text).to.contain("confirm password does not match");
        });

    });

    describe("name validation tests", () => {

        it("should fail if the supplied first name is less than 2 characters", async () => {
            const testRegister = {
                firstName: "",
                lastName: "Wren",
                email: "swren@vizsla.com",
                userName: "swren",
                password: "mandalore!21",
                confirmPassword: "mandalore!21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
        });

        it("should fail if the supplied first name is less than 2 characters", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "",
                email: "swren@vizsla.com",
                userName: "swren",
                password: "mandalore!21",
                confirmPassword: "mandalore!21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
        });

    });

    describe("username validation tests", () => {

        it("should fail if the supplied username is less than 3 characters", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swren@vizsla.com",
                userName: "sw",
                password: "mandalore!21",
                confirmPassword: "mandalore!21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
            expect(res.text).to.contain("your username must have minimum length of 3");
        });

    });

    describe("email validation tests", () => {

        it("should fail if the supplied email does not have an @", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swrenvizsla.com",
                userName: "swren",
                password: "mandalore!21",
                confirmPassword: "mandalore!21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
            expect(res.text).to.contain("invalid email address");
        });

        it("should fail if the supplied email does not have a top level domain", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "swren@vizsla",
                userName: "swren",
                password: "mandalore!21",
                confirmPassword: "mandalore!21"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
            expect(res.text).to.contain("invalid email address");
        });

    });

    describe("duplicate user registration tests", () => {

        it("should fail if the supplied username is already in the database", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "differentemail@email.com",
                userName: "hohnaka",
                password: "ezra.123",
                confirmPassword: "ezra.123"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
        });

        it("should fail if the supplied email is already in the database", async () => {
            const testRegister = {
                firstName: "Sabine",
                lastName: "Wren",
                email: "hohnaka@florrum.com",
                userName: "differentusername",
                password: "ezra.123",
                confirmPassword: "ezra.123"
            }
            const res = await chai.request(server).post("/register").send(testRegister);
            expect(res).to.have.status(400);
        });


    });

});