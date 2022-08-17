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

function createClientSignUp(email = "ciclano@gmail.com", passwordLength = 4) {
    const password = faker.internet.password(passwordLength);
    const fullName = faker.name.fullName();
    const profilePhoto = faker.image.people();
    const phoneNumber = faker.phone.number('## #####-####');
    return {
        email,
        password,
        fullName,
        profilePhoto,
        phoneNumber
    }
}

function createClientAddressSignUp() {
    const city = faker.address.cityName();
    const district = faker.name.jobTitle();
    const street =  faker.address.streetName();
    const number = faker.random.numeric(2);
    const complement = faker.lorem.sentence(3);
    const zipCode =  faker.address.zipCode('#####-###')
    return {
        city,
        district,
        street,
        number: parseInt(number),
        complement,
        zipCode
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

interface CreateClient {
    email: string;
    password: string;
    fullName: string;
    profilePhoto: string;
    phoneNumber: string;
}

async function createClientUser(CreateClient: CreateClient) {
    const client = await prisma.clients.create({
        data: {
            email: CreateClient.email,
            password: CreateClient.password,
            fullName: CreateClient.fullName,
            profilePhoto: CreateClient.profilePhoto,
            phoneNumber: CreateClient.phoneNumber
        }
    })

    return client
}

interface CreateAddress {
    clientId: number;
    city: string;
    district: string;
    street: string;
    number: number;
    complement: string;
    zipCode: string
}

async function createClientAddress(CreateAdress: CreateAddress) {
    const address = await prisma.addresses.create({
        data: {
            clientId: CreateAdress.clientId,
            city: CreateAdress.city,
            district: CreateAdress.district,
            street: CreateAdress.street,
            number: CreateAdress.number,
            complement: CreateAdress.complement,
            zipCode: CreateAdress.zipCode
        }
    })

    return address
}

const authFactory = {
    createProfessionalSignUp,
    createProfessionalUser,
    createClientSignUp,
    createClientAddressSignUp,
    createClientUser,
    createClientAddress
}

export default authFactory