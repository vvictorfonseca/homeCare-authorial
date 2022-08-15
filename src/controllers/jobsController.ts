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

async function getjobsByProfessionalId(req: Request, res: Response) {
    const professionalId = res.locals.user.id

    const jobs = await jobsService.getjobsByProfessionalId(professionalId)

    return res.status(200).send(jobs)
}

async function getJobsByClientId(req: Request, res: Response) {
    const clientId = res.locals.user.id

    const jobs = await jobsService.getJobsByClientId(clientId)

    return res.status(200).send(jobs)
}

async function deleteJobById(req: Request, res: Response) {
    const jobId = parseInt(req.params.jobId)

    await jobsService.deleteJobById(jobId)

    return res.sendStatus(200)
}

export { requestNewJob, updateRequestToTrue, getjobsByProfessionalId, getJobsByClientId, deleteJobById }