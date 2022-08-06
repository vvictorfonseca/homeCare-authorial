import { professionals } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: ".env "});

import professionalRepository from "../repositories/professionalRepository.js";

const { JWT_SECRET_KEY } = process.env

export type CreateProfessionalData = Omit<professionals, "id" | "description">
export type CreateProfessionalLogin = Omit<professionals, "id" | "fullName" | "city" | "type" | "profilePhoto" | "phoneNumber" | "description">

async function createProfessional(newProfessional: CreateProfessionalData) {
    const SALT = 10
    const professionalExist = await professionalRepository.getProfessionalByEmail(newProfessional.email)
    
    if(professionalExist) {
        throw { type: "conflict", message: "email already exist" }
    }

    newProfessional.password = bcrypt.hashSync(newProfessional.password, SALT)
    return await professionalRepository.createProfessional(newProfessional)
}

async function loginProfessional(loginProfessional: CreateProfessionalLogin) {
    const professional = await professionalRepository.getProfessionalByEmail(loginProfessional.email)

    const isCorrectPassword = bcrypt.compareSync(loginProfessional.password, professional.password)

    if(!professional || !isCorrectPassword) {
        throw { type: "not_found", message: "invalid user or password" }
    }

    const expiresAt = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign( {id: professional.id, email: professional.email}, JWT_SECRET_KEY, expiresAt)
    console.log("token", token)
    return token
}

async function getProfessionalsByTypeAndLocation(type: string, city: string) {
    const professionals = await professionalRepository.getProfessionalsByTypeAndLocation(type, city)
    
    professionals.forEach(
        (info) => delete info.password
    )

    return professionals
}

async function updateProfessionalDescription(description: string, email: string) {
    await professionalRepository.updateProfessionalDescription(description, email)
}

const professionalService = {
    createProfessional,
    loginProfessional,
    getProfessionalsByTypeAndLocation,
    updateProfessionalDescription
}

export default professionalService