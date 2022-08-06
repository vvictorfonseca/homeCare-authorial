import { Request, Response } from "express";
import professionalService, { CreateProfessionalData, CreateProfessionalLogin } from "../services/professionalService.js";
import clientService, { CreateClientData, CreateAddressData, CreateClientLogin } from "../services/clientService.js";

async function createProfessional(req: Request, res: Response) {
    const newProfessional: CreateProfessionalData = req.body

    await professionalService.createProfessional(newProfessional)
    
    return res.sendStatus(201)
}

async function loginProfessional(req: Request, res: Response) {
    const loginProfessional: CreateProfessionalLogin = req.body

    const token = await professionalService.loginProfessional(loginProfessional)

    return res.status(200).send(token)
}

async function getProfessionalsByType(req: Request, res: Response) {
    const type = req.params.type
    const clientId = res.locals.user.id

    const location = await clientService.getClientLocationById(clientId)
    let city: string = null
    location.address.forEach(
        (info) => city = info.city
    )

    console.log("city", city)

    const professionals = await professionalService.getProfessionalsByTypeAndLocation(type, city)

    return res.status(200).send(professionals)
}

async function updateProfessionalDescription(req: Request, res: Response) {
    const body = req.body
    const email = res.locals.user.email
    const description = body.description
    
    await professionalService.updateProfessionalDescription(description, email)
    
    return res.sendStatus(201)
}

export { createProfessional, loginProfessional, getProfessionalsByType, updateProfessionalDescription }