import { clients } from "@prisma/client";
import { addresses } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
//dotenv.config({ path: ".env "});

import clientReposiotory from "../repositories/clientsRepository.js";

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
    console.log("entrou no service pra pegar o token")
    const client = await clientReposiotory.getClientByEmail(loginClient.email)
    console.log("client do service", client)

    const isCorrectPassword = bcrypt.compareSync(loginClient.password, client.password)

    if(!client || !isCorrectPassword) {
        console.log("entrou no erro")
        throw { type: "not_found", message: "invalid user or password" }
    }

    const key = process.env.JWT_SECRET
    const expiresAt = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign({id: client.id, email: client.email}, key, expiresAt)
    console.log("to aqui", token)
    return token
}

async function getClientLocationById(clientId: number) {
    const location = await clientReposiotory.getClientLocationById(clientId)
    return location
}

async function updateClientLocation(newAddress: CreateAddressData) {
    await clientReposiotory.updateClientLocation(newAddress)
}

async function getClientByEmail(email: string) {
    const client = await clientReposiotory.getClientByEmail(email)
    return client
}

const clientService = {
    createClient,
    createClientAddress,
    getLastRegisterId,
    loginClient,
    getClientLocationById,
    updateClientLocation,
    getClientByEmail
}

export default clientService