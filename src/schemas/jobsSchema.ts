import Joi from "joi";
import { CreateJobData } from "../services/jobsService.js";

const newJobSchema = Joi.object<CreateJobData>({
    professionalId: Joi.number().required(),
    date: Joi.string().required().length(10)
})

export default newJobSchema