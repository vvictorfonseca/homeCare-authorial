import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import prisma from "../../src/config/database.js";

function createProfessionalSignUp(email = "fulano@gmail.com", passwordLength = 4) {
    const password = faker.internet.password(passwordLength);
    const fullName = faker.name.fullName();
    const city = faker.address.cityName();
    const type = "garden";
    const profilePhoto = faker.image.people();
    const phoneNumber = faker.phone.number('## #####-####');
    return {
        email,
        password,
        fullName,
        city,
        type,
        profilePhoto,
        phoneNumber
    }
}

interface CreateProfessional {
    email: string;
    password: string;
    fullName: string;
    city: string;
    type: string;
    profilePhoto: string;
    phoneNumber: string;
}

async function createProfessionalUser(CreateProfessional: CreateProfessional) {
    const professional = await prisma.professionals.create({
        data: {
            email: CreateProfessional.email,
            password: bcrypt.hashSync(CreateProfessional.password, 10),
            fullName: CreateProfessional.fullName,
            city: CreateProfessional.city,
            type: CreateProfessional.type,
            profilePhoto: CreateProfessional.profilePhoto,
            phoneNumber: CreateProfessional.phoneNumber
        },
    })

    return professional
}

const authFactory = {
    createProfessionalSignUp,
    createProfessionalUser
}

export default authFactory