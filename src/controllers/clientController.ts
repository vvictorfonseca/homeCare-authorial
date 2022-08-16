import { Request, Response } from "express";
import clientService, { CreateClientData, CreateAddressData, CreateClientLogin } from "../services/clientService.js";

async function createClient(req: Request, res: Response) {
    const newClient: CreateClientData = req.body
    console.log(newClient)

    await clientService.createClient(newClient)
    console.log("aquiiiii")

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

    console.log("loginClient", loginClient)

    const client = await clientService.getClientByEmail(loginClient.email)

    console.log("client", client)

    // const location = await clientService.getClientLocationById(client.id)
    // let city: string = null
    // location.address.forEach(
    //     (info) => city = info.city
    // )

    if (client != undefined) {
        console.log("entrou no client")
        const token = await clientService.loginClient(loginClient)

        const data = ({...client, token })
        delete data.password

        console.log("data", data)

        return res.status(200).send(data)
    }

}

async function updateClientLocation(req: Request, res: Response) {
    const newAddress: CreateAddressData = req.body
    const clientId = res.locals.user.id
    console.log(newAddress)
    

    await clientService.updateClientLocation({...newAddress, clientId: clientId})

    return res.sendStatus(200)
}

export { createClient, createClientAddress, loginClient, updateClientLocation }