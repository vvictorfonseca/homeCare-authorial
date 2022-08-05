import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import {professionalSchema, loginProfessionalSchema, updateDescriptionSchema} from "../schemas/professioanlService.js";
import { createProfessional, loginProfessional, getProfessionalsByType, updateProfessionalDescription } from "../controllers/professionalController.js";

const professionalRouter = Router()

professionalRouter.post("/sign-up/professional", validateSchema(professionalSchema), createProfessional)
professionalRouter.post("/sign-in/professional", validateSchema(loginProfessionalSchema), loginProfessional)
professionalRouter.get("/professionals/:type",  validateToken, getProfessionalsByType)
professionalRouter.put("/update/description", validateToken, updateProfessionalDescription)

export default professionalRouter