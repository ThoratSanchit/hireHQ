import fastify from "fastify";
import pino from "pino";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { sequelize, checkDatabaseConnection } from "./plugins/sequelize";
import candidateRoutes from "./routes/candidate.routes";
import jobRoutes from "./routes/job.routes";

dotenv.config();

// Create and export the app instance for testing purposes
export const app = fastify({
  logger: pino({ level: "info" }),
});

app.register(candidateRoutes);
app.register(jobRoutes);
// dotenv.config(); // Already called above, no need to call again
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

// sequelize.sync(); // Moved into startServer

const portNumber = Number(process.env.PORT) || 3000; // Renamed to avoid conflict if 'port' is used elsewhere
const startServer = async () => { // Renamed to avoid conflict if 'start' is used elsewhere
  try {
    await sequelize.sync(); // Sync database when server starts
    const dbStatus = await checkDatabaseConnection();
    if (!dbStatus.connected) {
      throw new Error(dbStatus.message);
    }

    await app.listen({ port: portNumber, host: "0.0.0.0" }, (err) => {
      if (err) throw err;
    });

    app.log.info(`Server listening on port ${portNumber}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Start the server only if this file is run directly
if (require.main === module) {
  startServer();
}
