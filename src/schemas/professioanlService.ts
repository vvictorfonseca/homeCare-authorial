import Joi from "joi";
import { CreateProfessionalData, CreateProfessionalLogin } from "../services/professionalService.js";

const professionalSchema = Joi.object<CreateProfessionalData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    fullName: Joi.string().required(),
    city: Joi.string().required(),
    type: Joi.valid("cleaning", "garden", "electricalService").required(),
    profilePhoto: Joi.string().required(),
    phoneNumber: Joi.string().required()
});

const loginProfessionalSchema = Joi.object<CreateProfessionalLogin>({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
})

const updateDescriptionSchema = Joi.object({
    description: Joi.string().min(8).required()
})

export {professionalSchema, loginProfessionalSchema, updateDescriptionSchema}