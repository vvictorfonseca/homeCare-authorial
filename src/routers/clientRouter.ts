import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import {clientSchema, addressShema, loginClientSchema} from "../schemas/clientSchema.js";
import { createClient, createClientAddress, loginClient } from "../controllers/clientController.js";

const clientRouter = Router()

clientRouter.post("/sign-up/client", validateSchema(clientSchema), createClient)
clientRouter.post("/sign-up/client/address", validateSchema(addressShema), createClientAddress)
clientRouter.post("/sign-in/client", validateSchema(loginClientSchema), loginClient)

export default clientRouter