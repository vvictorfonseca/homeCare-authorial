import { jobs } from "@prisma/client";

import jobsRepository from "../repositories/jobsRepository.js";
import professionalRepository from "../repositories/professionalRepository.js";

export type CreateJobData = Omit<jobs, "id" | "isConfirmed">

async function requestNewJob(newJob: CreateJobData) {

    const professional = await professionalRepository.getProfessionalById(newJob.professionalId)

    if(!professional) {
        throw { type: "not_found", message: "this professional is not registered" }
    }

    await jobsRepository.requestNewJob(newJob)
}

async function updateRequestToTrue(newJob: CreateJobData) {
    await jobsRepository.updateRequestToTrue(newJob)
}

async function getjobsByProfessionalId(professionalId: number) {
    const jobs = await jobsRepository.getjobsByProfessionalId(professionalId)
    return jobs
}

async function getJobsByClientId(clientId: number) {
    const jobs = await  jobsRepository.getJobsByClientId(clientId)
    return jobs
}

const jobsService = {
    requestNewJob,
    updateRequestToTrue,
    getjobsByProfessionalId,
    getJobsByClientId
}

export default jobsService

