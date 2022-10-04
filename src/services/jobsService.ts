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

async function getjobsByProfessionalId(professionalId: number) {
  const jobs = await jobsRepository.getjobsByProfessionalId(professionalId)

  return jobs
}

async function getJobsToEvaluateByClientId(clientId: number) {
  const jobs = await jobsRepository.getJobsByClientId(clientId)
  console.log("jobss", jobs)

  function getJobs(value) {
    let date = value.date
    let dateParts = date.split("/")
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    console.log("date object", dateObject)
    console.log("dayjs", dayjs())

    if (dayjs().isAfter(dateObject)) {
      console.log("entrou")
      return value
    }
  }

  const jobsFiltered = jobs.filter(getJobs)
  console.log("filtrado", jobsFiltered)

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

const jobsService = {
  requestNewJob,
  updateRequestToTrue,
  getjobsByProfessionalId,
  getJobsByClientId,
  deleteJobById,
  getJobsToEvaluateByClientId,
  evaluateJob
}

export default jobsService