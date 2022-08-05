import { date } from "joi";
import prisma from "../config/database.js";
import { CreateJobData } from "../services/jobsService.js";

async function requestNewJob(newJob: CreateJobData) {
    await prisma.jobs.create({data: newJob})
}

async function updateRequestToTrue(newJob: CreateJobData) {
    const updateJob = await prisma.jobs.updateMany({
        where: {
            clientId: newJob.clientId,
            professionalId: newJob.professionalId,
            date: newJob.date
        },
        data: {
            isConfirmed: true
        }
    })

    return updateJob
}

const jobsRepository = {
    requestNewJob,
    updateRequestToTrue
}

export default jobsRepository