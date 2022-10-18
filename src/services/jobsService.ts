import dayjs from "dayjs";

import { jobs,evaluations } from "@prisma/client";
import clientReposiotory from "../repositories/clientsRepository.js";
import jobsRepository from "../repositories/jobsRepository.js";
import professionalRepository from "../repositories/professionalRepository.js";

export type CreateJobData = Omit<jobs, "id" | "isConfirmed">
export type CreateEvaluateData = Omit<evaluations, "id">

async function requestNewJob(newJob: CreateJobData) {

  const professional = await professionalRepository.getProfessionalById(newJob.professionalId)

  if (!professional) {
    throw { type: "not_found", message: "this professional is not registered" }
  }

  await jobsRepository.requestNewJob(newJob)
}

async function updateRequestToTrue(newJob: CreateJobData) {

  const client = clientReposiotory.getClientById(newJob.clientId)
  const professional = professionalRepository.getProfessionalById(newJob.professionalId)

  if (!client || !professional) {
    throw { type: "bad_request", message: "professional or client nonexist" }
  }

  await jobsRepository.updateRequestToTrue(newJob)
}

async function updateRequestToDone(newJob: CreateJobData) {

  const client = clientReposiotory.getClientById(newJob.clientId)
  const professional = professionalRepository.getProfessionalById(newJob.professionalId)

  if (!client || !professional) {
    throw { type: "bad_request", message: "professional or client nonexist" }
  }

  await jobsRepository.updateRequestToDone(newJob)
}

async function getjobsByProfessionalId(professionalId: number) {
  const jobs = await jobsRepository.getjobsByProfessionalId(professionalId)

  return jobs
}

async function getJobsToEvaluateByClientId(clientId: number) {
  const jobs = await jobsRepository.getJobsByClientIdToEvaluate(clientId)

  function getJobs(value) {
    let date = value.date
    let dateParts = date.split("/")
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    if (dayjs().isAfter(dateObject)) {
      return value
    }
  }

  const jobsFiltered = jobs.filter(getJobs)

  return jobsFiltered
}

async function getJobsByClientId(clientId: number) {
  const jobs = await jobsRepository.getJobsByClientId(clientId)
  return jobs
}

async function deleteJobById(jobId: number) {
  await jobsRepository.deleteJobById(jobId)
}

async function evaluateJob(evaluateJob: CreateEvaluateData) {
  await jobsRepository.evaluateJob(evaluateJob)
}

async function getProfessionalEvaluations(professionalId: number) {
  const evaluations = await jobsRepository.getProfessionalEvaluations(professionalId)

  return evaluations
}

const jobsService = {
  requestNewJob,
  updateRequestToTrue,
  updateRequestToDone,
  getjobsByProfessionalId,
  getJobsByClientId,
  deleteJobById,
  getJobsToEvaluateByClientId,
  evaluateJob,
  getProfessionalEvaluations
}

export default jobsService