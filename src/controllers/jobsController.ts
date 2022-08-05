import { Request, Response } from "express";
import jobsService, { CreateJobData } from "../services/jobsService.js";

async function requestNewJob(req: Request, res: Response) {
    const body = req.body
    const clientId = res.locals.user.id
    const newJob: CreateJobData = ({...body, clientId})

    await jobsService.requestNewJob(newJob)

    return res.sendStatus(201)
}

async function updateRequestToTrue(req: Request, res: Response) {
    const body = req.body
    const professionalId = res.locals.user.id
    const newJob: CreateJobData = ({...body, professionalId})
    console.log("newJob", newJob)

    await jobsService.updateRequestToTrue(newJob)

    return res.sendStatus(201)
}

export { requestNewJob, updateRequestToTrue }