import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import newJobSchema from "../schemas/jobsSchema.js";
import { requestNewJob, updateRequestToTrue, getjobsByProfessionalId, getJobsByClientId } from "../controllers/jobsController.js";

const jobRouter = Router()

jobRouter.post("/request/job", validateToken, validateSchema(newJobSchema), requestNewJob)
jobRouter.put("/update/request", validateToken, updateRequestToTrue)
jobRouter.get("/jobs/professional", validateToken, getjobsByProfessionalId)
jobRouter.get("/jobs/client", validateToken, getJobsByClientId)

export default jobRouter