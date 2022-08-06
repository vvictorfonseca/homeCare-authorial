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
                    profilePhoto: true
                }
            }
        }
    });

    return jobs
}

const jobsRepository = {
    requestNewJob,
    updateRequestToTrue,
    getjobsByProfessionalId,
    getJobsByClientId
}

export default jobsRepository