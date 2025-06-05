import fastify from "fastify";
import pino from "pino";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { sequelize, checkDatabaseConnection } from "./plugins/sequelize";
import candidateRoutes from "./routes/candidate.routes";
import jobRoutes from "./routes/job.routes";

dotenv.config();

const app = fastify({
  logger: pino({ level: "info" }),
});
app.register(candidateRoutes);
app.register(jobRoutes);
dotenv.config();
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.get("/", async (request, reply) => {
  reply.send({ message: "welcome to baap-voting" });
});

app.get("/health", async (request, reply) => {
  reply.send({ message: "Health is ok..." });
});

sequelize.sync();

let port = Number(process.env.PORT) || 3000;
const start = async () => {
  try {
    const dbStatus = await checkDatabaseConnection();
    if (!dbStatus.connected) {
      throw new Error(dbStatus.message);
    }

    await app.listen({ port: port, host: "0.0.0.0" }, (err) => {
      if (err) throw err;
    });

    app.log.info(`Server listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
