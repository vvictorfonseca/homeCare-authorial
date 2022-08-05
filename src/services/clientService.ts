import { clients } from "@prisma/client";
import { addresses } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: ".env "});

import clientReposiotory from "../repositories/clientsRepository.js";

const { JWT_SECRET_KEY } = process.env

export type CreateClientData = Omit<clients, "id">
export type CreateClientLogin = Omit<clients, "id" | "fullName" | "phoneNumber">
export	type CreateAddressData = Omit<addresses, "id">

async function createClient(newClient: CreateClientData) {
    const SALT = 10
    const clientExist = await clientReposiotory.getClientByEmail(newClient.email)

    if(clientExist) {
        throw { type: "conflict", message: "email already exist" }
    }

    newClient.password = bcrypt.hashSync(newClient.password, SALT)
    return await clientReposiotory.createClient(newClient)
}

async function createClientAddress(newAddress: CreateAddressData) {
    return await clientReposiotory.createClientAddress(newAddress)
}

async function getLastRegisterId() {
    const id = await clientReposiotory.getLastRegisterId()
    return id
}

async function loginClient(loginClient: CreateClientLogin) {
    const client = await clientReposiotory.getClientByEmail(loginClient.email)

    const isCorrectPassword = bcrypt.compareSync(loginClient.password, client.password)

    if(!client || !isCorrectPassword) {
        throw { type: "not_found", message: "invalid user or password" }
    }

    const expiresAt = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign({id: client.id, email: client.email}, JWT_SECRET_KEY, expiresAt)
    return token
}

const clientService = {
    createClient,
    createClientAddress,
    getLastRegisterId,
    loginClient
}

export default clientService