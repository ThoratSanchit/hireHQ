import { FastifyInstance } from "fastify";
import {
  createCandidate,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  getAllCandidate,
} from "../controllers/candidate.controllers";

const candidateRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/candidate", createCandidate);
  fastify.get("/candidate/:id", getCandidateById);
  fastify.get("/candidate", getAllCandidate);
  fastify.put("/candidate/:id", updateCandidate);
  fastify.delete("/candidate/:id", deleteCandidate);
};

export default candidateRoutes;
