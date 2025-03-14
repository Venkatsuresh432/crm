const request = require("supertest");
const app = require("../app"); // Your Express App
const pool = require("../config/db");

describe("Notification API Tests", () => {
    
    let notificationId;

    test("Create a notification", async () => {
        const response = await request(app)
            .post("/api/notification")
            .send({ user_id: "123e4567-e89b-12d3-a456-426614174000", message: "Test message", type: "info" });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        notificationId = response.body.data.id;
    });

    test("Get all notifications", async () => {
        const response = await request(app).get("/api/notification");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("Get notification by ID", async () => {
        const response = await request(app).get(`/api/notification/${notificationId}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("Update a notification", async () => {
        const response = await request(app)
            .put(`/api/notification/${notificationId}`)
            .send({ is_read: true });

        expect(response.status).toBe(200);
    });

    test("Delete a notification", async () => {
        const response = await request(app).delete(`/api/notification/${notificationId}`);
        expect(response.status).toBe(200);
    });

});

afterAll(async () => {
    await pool.end();
});
