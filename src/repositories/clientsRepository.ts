import prisma from "../config/database.js";
import { CreateClientData, CreateAddressData } from "../services/clientService.js";

async function createClient(newClient: CreateClientData) {
    await prisma.clients.create({data: newClient})
}

async function getClientByEmail(email: string) {
    const client = await prisma.clients.findFirst({where: {email}})
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


const clientReposiotory = {
    createClient,
    getClientByEmail,
    createClientAddress,
    getLastRegisterId
}

export default clientReposiotory