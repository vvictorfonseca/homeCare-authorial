import Joi from "joi";
import { CreateClientData, CreateAddressData, CreateClientLogin } from "../services/clientService.js";

const clientSchema = Joi.object<CreateClientData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required()
})

const addressShema = Joi.object<CreateAddressData>({
    city: Joi.string().required(),
    district: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(), 
    complement: Joi.string().required(),
    zipCode: Joi.string().required()
})

const loginClientSchema = Joi.object<CreateClientLogin>({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
})

export { clientSchema, addressShema, loginClientSchema }