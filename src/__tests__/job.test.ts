import supertest from "supertest";
import { app } from "../app"; // Correctly import the exported Fastify app
// import JobModel from "../models/job.model"; // Model is imported in setup.ts
// import { sequelize } from "../plugins/sequelize"; // Sequelize is used via setup.ts
import { setupTestDatabase, closeTestDatabase } from "./setup";

const request = supertest(app.server);

describe("Job API", () => {
  let jobId: string;

  beforeAll(async () => {
    await setupTestDatabase();
    // Wait for app to be ready
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await closeTestDatabase(); // Close sequelize connection via setup
  });

  it("should create a new job", async () => {
    const response = await request.post("/job").send({
      job_title: "Software Engineer", // Corrected field name
      job_description: "Develop amazing software.", // Corrected field name
      location_city: "Remote", // Example, adjust as per actual model/usage for location
      salary_min: 100000, // Example, adjust as per actual model/usage for salary
      skills_required: ["Node.js", "TypeScript"] // Using the corrected JSON type
    });
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    jobId = response.body.data.id;
  });

  it("should get all jobs", async () => {
    // Create a job first to ensure there's data
    await request.post("/job").send({
      job_title: "Product Manager",
      job_description: "Manage great products.",
      location_city: "Austin"
    });
    const response = await request.get("/job");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a job by ID", async () => {
    const response = await request.get(`/job/${jobId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("id", jobId);
  });

  it("should return 404 for a non-existent job ID (GET)", async () => {
    const response = await request.get("/job/nonexistentid999");
    expect(response.status).toBe(404);
  });

  it("should update a job", async () => {
    const response = await request.put(`/job/${jobId}`).send({
      job_title: "Senior Software Engineer", // Corrected field name
      salary_min: 120000, // Corrected field name, assuming salary maps to salary_min
    });
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("job_title", "Senior Software Engineer");
    expect(response.body.data).toHaveProperty("salary_min", 120000);
  });

  it("should return 404 when trying to update a non-existent job", async () => {
    const response = await request.put("/job/nonexistentid999").send({
      title: "Non Existent Job",
    });
    expect(response.status).toBe(404);
  });

  it("should delete a job", async () => {
    const response = await request.delete(`/job/${jobId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job deleted successfully.");
  });

  it("should return 404 when trying to delete a non-existent job", async () => {
    const response = await request.delete("/job/nonexistentid999");
    expect(response.status).toBe(404);
  });
});
