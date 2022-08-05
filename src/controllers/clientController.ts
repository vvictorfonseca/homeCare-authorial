import { Request, Response } from "express";
import clientService, { CreateClientData, CreateAddressData, CreateClientLogin } from "../services/clientService.js";

async function createClient(req: Request, res: Response) {
    const newClient: CreateClientData = req.body

    await clientService.createClient(newClient)

    return res.sendStatus(201)
}

async function createClientAddress(req: Request, res: Response) {
    const newAddress: CreateAddressData = req.body

    const client = clientService.getLastRegisterId()

    await clientService.createClientAddress({...newAddress, clientId: (await client).id})
    return res.sendStatus(201)
}

async function loginClient(req: Request, res: Response) {
    const loginClient: CreateClientLogin = req.body

    const token = await clientService.loginClient(loginClient)

    return res.status(200).send(token)
}

export { createClient, createClientAddress, loginClient }