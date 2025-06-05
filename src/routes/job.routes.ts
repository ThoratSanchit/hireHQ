import { FastifyInstance } from "fastify";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller";

const jobRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/job", createJob);
  fastify.get("/job", getAllJobs);
  fastify.get("/job/:id", getJobById);
  fastify.put("/job/:id", updateJob);
  fastify.delete("/job/:id", deleteJob);
};

export default jobRoutes;
