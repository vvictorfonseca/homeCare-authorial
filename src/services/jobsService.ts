import { jobs } from "@prisma/client";
import clientReposiotory from "../repositories/clientsRepository.js";
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

    const client = clientReposiotory.getClientById(newJob.clientId)
    const professional = professionalRepository.getProfessionalById(newJob.professionalId)

    if(!client || !professional) {
        throw { type: "bad_request", message: "professional or client nonexist" }
    }

    await jobsRepository.updateRequestToTrue(newJob)
}

async function getjobsByProfessionalId(professionalId: number) {
    const jobs = await jobsRepository.getjobsByProfessionalId(professionalId)

    // if (jobs.length == 0) {
    //     throw { type: "bad_request", message: "This professional has no jobs registered" }
    // }

    return jobs
}

async function getJobsByClientId(clientId: number) {
    const jobs = await  jobsRepository.getJobsByClientId(clientId)
    return jobs
}

async function deleteJobById(jobId: number) {
    await jobsRepository.deleteJobById(jobId)
}

const jobsService = {
    requestNewJob,
    updateRequestToTrue,
    getjobsByProfessionalId,
    getJobsByClientId,
    deleteJobById
}

export default jobsService