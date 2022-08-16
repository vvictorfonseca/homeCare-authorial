import prisma from "../config/database.js";
import { CreateClientData, CreateAddressData } from "../services/clientService.js";

async function createClient(newClient: CreateClientData) {
    await prisma.clients.create({data: newClient})
}

async function getClientByEmail(email: string) {
    const client = await prisma.clients.findFirst({where: {email}})
    return client
}

async function getClientById(clientId: number) {
    const client = await prisma.clients.findFirst({where: {id: clientId}})
    return client
}

async function createClientAddress(newAddress: CreateAddressData) {
    await prisma.addresses.create({data: newAddress})
}

async function getLastRegisterId() {
    const id = prisma.clients.findFirst({
        orderBy: {
            id: 'desc'
        },
        take: 1
    })

    return id
}

async function getClientLocationById(clientId: number) {
    const location = prisma.clients.findFirst({
        where: {id: clientId},
        select: {
            address: {
                select: {
                    city: true
                }
            }
        }
    })

    return location
}

async function updateClientLocation(newAddress: CreateAddressData) {
    const updateLocation = await prisma.addresses.updateMany({
        where: {
            clientId: newAddress.clientId
        },
        data: {
            city: newAddress.city,
            district: newAddress.district,
            street: newAddress.street,
            number: newAddress.number,
            complement: newAddress.complement,
            zipCode: newAddress.zipCode
        },
    })

    return updateLocation
}


const clientReposiotory = {
    createClient,
    getClientByEmail,
    createClientAddress,
    getLastRegisterId,
    getClientLocationById,
    updateClientLocation,
    getClientById
}

export default clientReposiotory