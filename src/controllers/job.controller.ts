import { FastifyReply, FastifyRequest } from "fastify";
import { jobInterface } from "../interface/job.interface";
import JobModel from "../models/job.model"; // Corrected import for default export

export const createJob = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const jobData = request.body as jobInterface;
    const newJob = await JobModel.create({ ...jobData });

    reply.status(201).send({
      status_code: 201,
      data: newJob,
      message: "Job created successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred while creating job.",
      error: error,
    });
    console.error(error);
  }
};

export const getAllJobs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const jobs = await JobModel.findAll();
    reply.status(200).send({
      status_code: 200,
      data: jobs,
      message: "Jobs retrieved successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred while retrieving jobs.",
      error: error,
    });
    console.error(error);
  }
};

export const getJobById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const job = await JobModel.findByPk(id);

    if (!job) {
      reply.status(404).send({
        status_code: 404,
        message: "Job not found.",
      });
      return;
    }

    reply.status(200).send({
      status_code: 200,
      data: job,
      message: "Job retrieved successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred while retrieving job.",
      error: error,
    });
    console.error(error);
  }
};

export const updateJob = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const updateData = request.body as Partial<jobInterface>;
    const job = await JobModel.findByPk(id);

    if (!job) {
      reply.status(404).send({
        status_code: 404,
        message: "Job not found.",
      });
      return;
    }

    const updatedJob = await job.update(updateData);
    reply.status(200).send({
      status_code: 200,
      data: updatedJob,
      message: "Job updated successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred while updating job.",
      error: error,
    });
    console.error(error);
  }
};

export const deleteJob = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const job = await JobModel.findByPk(id);

    if (!job) {
      reply.status(404).send({
        status_code: 404,
        message: "Job not found.",
      });
      return;
    }

    await JobModel.destroy({ where: { id } });
    reply.status(200).send({
      status_code: 200,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred while deleting job.",
      error: error,
    });
    console.error(error);
  }
};
