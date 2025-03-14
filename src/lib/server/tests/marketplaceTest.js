const request = require('supertest');
const app = require('../app'); // Your Express app entry point
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

let testMarketplaceId;

describe('Marketplace API Tests', () => {
    beforeAll(async () => {
        await pool.execute("DELETE FROM marketplace"); // Clean database before tests
    });

    test('POST /marketplace - Create a marketplace', async () => {
        const response = await request(app)
            .post('/marketplace')
            .send({
                app_name: "Test App",
                description: "A test app",
                icon_url: "http://example.com/icon.png",
                app_type: "native",
                iframe_url: "http://example.com/iframe",
                security_groups_admin: ["admin1"],
                security_groups_user: ["user1"],
                created_by: uuidv4()
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.data).toHaveProperty('id');
        testMarketplaceId = response.body.data.id;
    });

    test('GET /marketplace - Retrieve all marketplaces', async () => {
        const response = await request(app).get('/marketplace');
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test('GET /marketplace/:id - Retrieve a specific marketplace', async () => {
        const response = await request(app).get(`/marketplace/${testMarketplaceId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.id).toBe(testMarketplaceId);
    });

    test('PUT /marketplace/:id - Update a marketplace', async () => {
        const response = await request(app)
            .put(`/marketplace/${testMarketplaceId}`)
            .send({ app_name: "Updated Test App" });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.data.app_name).toBe("Updated Test App");
    });

    test('DELETE /marketplace/:id - Delete a marketplace', async () => {
        const response = await request(app).delete(`/marketplace/${testMarketplaceId}`);
        expect(response.statusCode).toBe(200);
    });

    test('GET /marketplace/:id - Verify deletion', async () => {
        const response = await request(app).get(`/marketplace/${testMarketplaceId}`);
        expect(response.statusCode).toBe(404);
    });

    afterAll(async () => {
        await pool.end(); // Close DB connection after tests
    });
});
