import app from "../src/app.js";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import prisma from "../src/config/database.js";

import authFactory from "./factories/appFactory.js"

beforeEach(async () => {
    await prisma.$executeRaw`DELETE from professionals WHERE email = 'fulano@gmail.com'`
    //await prisma.$executeRaw`DELETE from clients WHERE email = 'ciclano@gmail.com'`
    await prisma.$executeRaw`TRUNCATE TABLE clients CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE jobs`
})

const agent = supertest(app);

describe("Professional Sign-up tests", () => {

    it("return 201 for valid input", async () => {
        const data = await authFactory.createProfessionalSignUp()
        const response = await agent.post("/sign-up/professional").send(data)

        expect(response.status).toEqual(201)
    })

    it("return 409 for duplicate professional", async () => {
        const data = await authFactory.createProfessionalSignUp()
        await authFactory.createProfessionalUser(data)
        const response = await agent.post("/sign-up/professional").send(data)

        expect(response.status).toEqual(409)
    })

    it("return 422 for invalid input", async () => {
        const data = await authFactory.createProfessionalSignUp()
        delete data.password
        const response = await agent.post("/sign-up/professional").send(data)

        expect(response.status).toBe(422)
    })
})

describe("Professional Sign-in tests", () => {
    
    it("return token for valid input", async () => {
        const data = authFactory.createProfessionalSignUp()
        await authFactory.createProfessionalUser(data)

        const response = await agent.post("/sign-in/professional").send({
            email: data.email,
            password: data.password
        })

        const token = response.body.token
        console.log("token login professional", token)

        expect(token).not.toBeNull
    })

    it("return 404 for invalid email or password", async () => {
        const data = await authFactory.createProfessionalSignUp()
        const professional = await authFactory.createProfessionalUser(data)

        const response = await agent.post("/sign-in/professional").send({
            email: professional.email,
            password: "123456"
        })

        expect(response.status).toBe(404)
    })

    it("return 422 for invalid input", async () => {
        const data = await authFactory.createProfessionalSignUp()
        await authFactory.createProfessionalUser(data)
        delete data.city
        delete data.fullName
        delete data.phoneNumber
        delete data.type
        delete data.profilePhoto
        delete data.password

        const response = await agent.post("/sign-in/professional").send(data)

        expect(response.status).toBe(422)
    })
})

describe("Update professional Description tests", () => {
    
    it("return 201 for updated description", async () => {
        const data = await authFactory.createProfessionalSignUp()
        await authFactory.createProfessionalUser(data)

        const responseLogin = await agent.post("/sign-in/professional").send({
            email: data.email,
            password: data.password
        })
        const token = responseLogin.body.token
        console.log("token  description", token)

        const body = {
            description: faker.lorem.sentence(4)
        } 

        const response = await agent.put("/update/description").set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(200)
    })

    it("return 422 for invalid description", async () => {
        const data = await authFactory.createProfessionalSignUp()
        await authFactory.createProfessionalUser(data)

        const responseLogin = await agent.post("/sign-in/professional").send({
            email: data.email,
            password: data.password
        })
        const token = responseLogin.body.token

        const body = {
            description: "oi"
        } 

        const response = await agent.put("/update/description").set("Authorization", `Bearer ${token}`).send(body)
        expect(response.status).toBe(422)
    })
})

describe("get professional jobs test", () => {
    
    it("return 200 for getting professional jobs", async () => {
        const data = await authFactory.createProfessionalSignUp()
        await authFactory.createProfessionalUser(data)

        const responseLogin = await agent.post("/sign-in/professional").send({
            email: data.email,
            password: data.password
        })
        const token = responseLogin.body.token

        const response = await agent.get("/jobs/professional").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})

describe("client Sign-up tests", () => {
    
    it("return 201 for valid inputs", async () => {
        const data = authFactory.createClientSignUp();
        const address = authFactory.createClientAddressSignUp()

        const clientResponse = await agent.post("/sign-up/client").send(data)
        expect(clientResponse.status).toBe(201)

        const client = await prisma.clients.findFirst({
            where: {email: data.email}
        })
        const clientId = client.id

        const addressResponse = await agent.post("/sign-up/client/address").send({...address, clientId})
        expect(addressResponse.status).toBe(201)
    })

    it("return 409 for duplicate client", async () => {
        const data = authFactory.createClientSignUp();
        const client = await authFactory.createClientUser(data)
        const addressData = authFactory.createClientAddressSignUp();
        const clientId = client.id
        await authFactory.createClientAddress({...addressData, clientId})

        const response = await agent.post("/sign-up/client").send(data)
        expect(response.status).toBe(409);
    })

    it("return 422 for invalid input", async () => {
        const data = authFactory.createClientSignUp();
        delete data.fullName

        const response = await agent.post("/sign-up/client").send(data)
        expect(response.status).toBe(422)
    })
})

describe("client Sign-in tests", () => {

    it("return token for valid input", async () => {
        const data = authFactory.createClientSignUp();
        await authFactory.createClientUser(data);

        const response = await agent.post("/sign-in/client").send({
            email: data.email,
            password: data.password
        })

        const token = response.body.token
        console.log("clientToken", token)

        expect(token).not.toBeNull
    })

    it("return 404 for invalid email or password", async () => {
        const data = authFactory.createClientSignUp();
        await authFactory.createClientUser(data);

        const response = await agent.post("/sign-in/client").send({
            email: data.email,
            password: "1234"
        })

        expect(response.status).toBe(404)
    })

    it("return 422 for invalid input", async () => {
        const data = authFactory.createClientSignUp();
        await authFactory.createClientUser(data);

        const response = await agent.post("/sign-in/client").send({
            email: data.email
        })

        expect(response.status).toBe(422)
    })

})

afterAll(async () => {
    await prisma.$disconnect
});