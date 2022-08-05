import { Router } from "express";

import professionalRouter from "./professionalRouter.js";
import clientRouter from "./clientRouter.js";
import jobRouter from "./jobRouter.js";

const router = Router()

router.use(professionalRouter)
router.use(clientRouter)
router.use(jobRouter)

export default router