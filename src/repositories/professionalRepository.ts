import prisma from "../config/database.js";
import { CreateProfessionalData } from "../services/professionalService";

async function createProfessional(newProfessional: CreateProfessionalData) {
    await prisma.professionals.create({data: newProfessional})
}

async function getProfessionalByEmail(email: string) {
    const professional = await prisma.professionals.findFirst({where: {email}})
    return professional
}

async function getProfessionalsByTypeAndLocation(type: string, city: string) {
    const professionals = await prisma.professionals.findMany({
        where: {
            type: type,
            city: {
                contains: city,
                mode: 'insensitive'
            }
        }
        
    });
    
    return professionals
}

async function updateProfessionalDescription(description: string, email: string) {
    const updateDescription = prisma.professionals.update({
        where: {
            email: email
        },
        data: {
            description
        },
    })
    
    return updateDescription
}

async function getProfessionalById(professionalId: number) {
    const professional = await prisma.professionals.findFirst({where: {id: professionalId}})
    return professional
}

const professionalRepository = {
    createProfessional,
    getProfessionalByEmail,
    getProfessionalsByTypeAndLocation,
    updateProfessionalDescription,
    getProfessionalById
}

export default professionalRepository