import { Request, Response } from "express";
import jobsService, { CreateJobData, CreateEvaluateData } from "../services/jobsService.js";

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

    await jobsService.updateRequestToTrue(newJob)

    return res.sendStatus(201)
}

async function updateRequestToDone(req: Request, res: Response) {
  const body = req.body
  const clientId = res.locals.user.id
  const newJob: CreateJobData = ({...body, clientId})

  await jobsService.updateRequestToDone(newJob)

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

async function getJobsToEvaluateByClientId(req: Request, res: Response) {
  const clientId = res.locals.user.id

  const jobs = await jobsService.getJobsToEvaluateByClientId(clientId)

  return res.status(200).send(jobs)
}

async function deleteJobById(req: Request, res: Response) {
    const jobId: number = parseInt(req.params.jobId)

    await jobsService.deleteJobById(jobId)

    return res.sendStatus(200)
}

async function evaluateJob(req: Request, res: Response) {
  const evaluateJob: CreateEvaluateData = req.body

  await jobsService.evaluateJob(evaluateJob)

  return res.sendStatus(201)
}

async function getProfessionalEvaluations(req: Request, res: Response) {
  const professionalId: number = parseInt(req.params.professionalId)

  const evaluations = await jobsService.getProfessionalEvaluations(professionalId)

  return res.status(200).send(evaluations)
}

export { requestNewJob, updateRequestToTrue, getjobsByProfessionalId, getJobsByClientId, deleteJobById, getJobsToEvaluateByClientId, evaluateJob, updateRequestToDone, getProfessionalEvaluations }