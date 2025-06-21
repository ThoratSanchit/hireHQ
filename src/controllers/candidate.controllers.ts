import { FastifyReply, FastifyRequest } from "fastify";
import { candidateInterface } from "../interface/candidate.interface";
import { CandidateModel } from "../models/candidate.models";

export const createCandidate = async (
  requst: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const candidateData = requst.body as candidateInterface;
    const createCandidate = await CandidateModel.create({ ...candidateData });

    reply.status(201).send({
      status_code: 201,
      id: candidateData?.id,
      createCandidate,
      message: "candidate created successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred while creating voter.",
      error: error,
    });

    console.log(error);
  }
};

export const getAllCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const candidates = await CandidateModel.findAll();
    reply.status(201).send({
      status_code: 201,
      candidates,
      message: "Candidate created successfully.",
    });
  } catch (error) {
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred.",
      error: error,
    });
  }
};

export const getCandidateById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };

    const result = await CandidateModel.findByPk(id);

    reply.send({
      result,
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred.",
      error: error,
    });
  }
};

export const updateCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const updateData = request.body as candidateInterface;
    const findData = await CandidateModel.findByPk(id);
    if (!findData) {
      reply.status(404).send({
        status_code: 404,
        message: "Candidate not found.",
      });
      return; // Added return to stop execution
    }

    const updateCandidate = await findData.update(updateData); // Removed optional chaining as findData is guaranteed here
    reply.status(201).send({
      status_code: 201,
      updateCandidate,
      message: "Candidate updated successfully.",
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      status_code: 500,
      message: "An error occurred .",
      error: error,
    });
  }
};

export const deleteCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const findData = await CandidateModel.findByPk(id);

    if (!findData) {
      return reply.status(404).send({
        status_code: 404,
        message: "Candidate not found.",
      });
    }

    await CandidateModel.destroy({
      where: { id },
    });
    reply.status(200).send({
      status_code: 200,
      message: "Candidate deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      status_code: 500,
      message: "Failed to delete candidate.",
      error: error,
    });
  }
};
