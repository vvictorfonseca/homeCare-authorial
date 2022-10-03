import Joi from "joi";
import { CreateJobData, CreateEvaluateData } from "../services/jobsService.js";

const newJobSchema = Joi.object<CreateJobData>({
    professionalId: Joi.number().required(),
    date: Joi.string().required().length(10)
})

const evaluateJobSchema = Joi.object<CreateEvaluateData>({
    jobId: Joi.number().required(),
    content: Joi.string().min(6).required()
})

export  { newJobSchema, evaluateJobSchema }