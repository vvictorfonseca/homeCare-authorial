import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import  {newJobSchema, evaluateJobSchema } from "../schemas/jobsSchema.js";
import { requestNewJob, updateRequestToTrue, getjobsByProfessionalId, getJobsByClientId, deleteJobById, getJobsToEvaluateByClientId, evaluateJob, updateRequestToDone } from "../controllers/jobsController.js";

const jobRouter = Router()

jobRouter.post("/request/job", validateToken, validateSchema(newJobSchema), requestNewJob)
jobRouter.put("/update/request", validateToken, updateRequestToTrue)
jobRouter.put("/update/job/done", validateToken, updateRequestToDone)
jobRouter.get("/jobs/professional", validateToken, getjobsByProfessionalId)
jobRouter.get("/jobs/client", validateToken, getJobsByClientId)
jobRouter.get("/jobs/client/evaluate", validateToken, getJobsToEvaluateByClientId)
jobRouter.delete("/delete/job/:jobId", validateToken, deleteJobById)
jobRouter.post("/evaluate/job", validateToken, validateSchema(evaluateJobSchema), evaluateJob)

export default jobRouter