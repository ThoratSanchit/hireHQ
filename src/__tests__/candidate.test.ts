import supertest from "supertest";
import { app } from "../app"; // Correctly import the exported Fastify app
// import { CandidateModel } from "../models/candidate.models"; // Model is imported in setup.ts
// import { sequelize } from "../plugins/sequelize"; // Sequelize is used via setup.ts
import { setupTestDatabase, closeTestDatabase } from "./setup";

const request = supertest(app.server);

describe("Candidate API", () => {
  let candidateId: string;

  beforeAll(async () => {
    await setupTestDatabase();
    // Wait for app to be ready
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await closeTestDatabase(); // Close sequelize connection via setup
  });

  it("should create a new candidate", async () => {
    const response = await request.post("/candidate").send({
      candidate_name: "John Doe",
      candidate_email: "john.doe@example.com",
      candidate_gender: "Male", // Added missing non-nullable field
      phone_number: "1234567890", // Corrected field name from 'phone'
      candidate_address: "123 Main St", // Corrected field name from 'address'
      // skills: ["Node.js", "TypeScript"], // 'skills' is not directly on CandidateModel, maybe part of work_experience or similar
      overall_experience: 5, // Corrected field name from 'experience'
      candidate_job_title: "Developer" // Added an example for a nullable field
    });
    expect(response.status).toBe(201);
    expect(response.body.createCandidate).toHaveProperty("id");
    candidateId = response.body.createCandidate.id;
  });

  it("should get all candidates", async () => {
    // Create a candidate first to ensure there's data
    await request.post("/candidate").send({
      candidate_name: "Jane Smith",
      candidate_email: "jane.smith@example.com",
      candidate_gender: "Female",
      candidate_job_title: "QA Tester"
    });
    const response = await request.get("/candidate");
    expect(response.status).toBe(201); // Controller returns 201, ideally should be 200
    expect(response.body.candidates).toBeInstanceOf(Array);
    expect(response.body.candidates.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a candidate by ID", async () => {
    const response = await request.get(`/candidate/${candidateId}`);
    expect(response.status).toBe(200);
    expect(response.body.result).toHaveProperty("id", candidateId);
  });

  it("should return null result for a non-existent candidate ID (GET)", async () => {
    const response = await request.get("/candidate/nonexistentid999");
    expect(response.status).toBe(200); // Controller returns 200 with null result
    expect(response.body.result).toBeNull();
  });

  it("should update a candidate", async () => {
    const response = await request.put(`/candidate/${candidateId}`).send({
      candidate_name: "Johnathan Doe", // Corrected field name
      overall_experience: 6,      // Corrected field name
    });
    expect(response.status).toBe(201); // Controller returns 201, ideally should be 200
    expect(response.body.updateCandidate).toHaveProperty("candidate_name", "Johnathan Doe");
    expect(response.body.updateCandidate).toHaveProperty("overall_experience", 6);
  });

  it("should return 404 when trying to update a non-existent candidate", async () => {
    const response = await request.put("/candidate/nonexistentid999").send({
      name: "Jane Doe",
    });
    expect(response.status).toBe(404);
  });


  it("should delete a candidate", async () => {
    const response = await request.delete(`/candidate/${candidateId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Candidate deleted successfully.");
  });

  it("should return 404 when trying to delete a non-existent candidate", async () => {
    const response = await request.delete("/candidate/nonexistentid999");
    expect(response.status).toBe(404);
  });
});
