import prisma from "../config/database.js";
import { CreateJobData, CreateEvaluateData } from "../services/jobsService.js";

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
            isConfirmed: "Confirmed"
        }
    })

    return updateJob
}

async function getjobsByProfessionalId(professionalId: number) {
    const jobs = await prisma.jobs.findMany({
        where: {
            professionalId
        },
        
        select: {
            id: true,
            date: true,
            isConfirmed: true,
            
            clients: {
                select: {
                    id: true,
                    fullName: true,
                    phoneNumber: true,
                    profilePhoto: true,
                    
                    address: {
                        select: {
                            clientId: true,
                            city: true,
                            district: true,
                            street: true,
                            number: true,
                            complement: true,
                            zipCode: true
                        }
                    }
                }
            },
            
            professionals: {
                select: {
                    id: true,
                    fullName: true,
                    city: true,
                    type: true
                }
            }
        }
    });

    return jobs
}

async function getJobsByClientId(clientId: number) {
    const jobs = await prisma.jobs.findMany({
        where: {
            clientId
        },

        select: {
            id: true,
            date: true,
            isConfirmed: true,
            
            clients: {
                select: {
                    id: true,
                    fullName: true,
                    phoneNumber: true,
                    
                    address: {
                        select: {
                            clientId: true,
                            city: true,
                        }
                    }
                }
            },
            
            professionals: {
                select: {
                    id: true,
                    fullName: true,
                    city: true,
                    type: true,
                    phoneNumber: true,
                    profilePhoto: true,
                    description: true
                }
            }
        }
    });

    return jobs
}

async function deleteJobById(jobId: number) {
    const job = await prisma.jobs.delete({
        where: {id: jobId}
    })

    return job
}

async function evaluateJob(evaluateJob: CreateEvaluateData) {
  await prisma.evaluations.create({data: evaluateJob})
}

const jobsRepository = {
    requestNewJob,
    updateRequestToTrue,
    getjobsByProfessionalId,
    getJobsByClientId,
    deleteJobById,
    evaluateJob
}

export default jobsRepository