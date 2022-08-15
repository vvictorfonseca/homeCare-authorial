import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import {clientSchema, addressShema, loginClientSchema} from "../schemas/clientSchema.js";
import { createClient, createClientAddress, loginClient, updateClientLocation } from "../controllers/clientController.js";
import validateToken from "../middlewares/validateToken.js";

const clientRouter = Router()

clientRouter.post("/sign-up/client", validateSchema(clientSchema), createClient)
clientRouter.post("/sign-up/client/address", validateSchema(addressShema), createClientAddress)
clientRouter.post("/client", validateSchema(loginClientSchema), loginClient)
clientRouter.put("/update/location", validateToken, validateSchema(addressShema), updateClientLocation)

export default clientRouter