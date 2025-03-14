const request = require("supertest");
const app = require("../app"); // Ensure your Express app is exported in `app.js`
const pool = require("../config/db");

let testApiId;

describe("API Integration Endpoints", () => {
    beforeAll(async () => {
        await pool.execute("DELETE FROM api_integrations"); // Clean DB before tests
    });

    afterAll(async () => {
        await pool.end(); // Close DB connection after tests
    });

    /** ✅ TEST: Create API Integration */
    test("Should create a new API integration", async () => {
        const response = await request(app)
            .post("/apiintegration")
            .send({
                name: "Test API",
                endpoint_url: "https://example.com/api",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: { key: "value" },
                authentication: { token: "12345" }
            })
            .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("id");

        testApiId = response.body.data.id;
    });

    /** ✅ TEST: Fetch All API Integrations */
    test("Should fetch all API integrations", async () => {
        const response = await request(app).get("/apiintegration").expect(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    /** ✅ TEST: Fetch Single API Integration by ID */
    test("Should fetch a single API integration by ID", async () => {
        const response = await request(app).get(`/apiintegration/${testApiId}`).expect(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data[0]).toHaveProperty("id", testApiId);
    });

    /** ✅ TEST: Update API Integration */
    test("Should update an API integration", async () => {
        const response = await request(app)
            .put(`/apiintegration/${testApiId}`)
            .send({
                name: "Updated API",
                method: "GET"
            })
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    /** ✅ TEST: Delete API Integration */
    test("Should delete an API integration", async () => {
        const response = await request(app).delete(`/apiintegration/${testApiId}`).expect(200);
        expect(response.body.success).toBe(true);
    });

    /** ❌ TEST: Fetch Non-existent API */
    test("Should return 404 for non-existent API", async () => {
        await request(app).get(`/apiintegration/invalid-id`).expect(404);
    });
});
