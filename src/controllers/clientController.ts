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

    const client = await clientService.getClientByEmail(loginClient.email)

    const location = await clientService.getClientLocationById(client.id)
        
    let city: string = null
        
    location.address.forEach(
    (info) => city = info.city
    )

    const data = ({...client, token, city })
    delete data.password

    return res.status(200).send({...client, token, city})
}

async function updateClientLocation(req: Request, res: Response) {
    const newAddress: CreateAddressData = req.body
    const clientId = res.locals.user.id
    
    await clientService.updateClientLocation({...newAddress, clientId: clientId})

    return res.sendStatus(200)
}

export { createClient, createClientAddress, loginClient, updateClientLocation }