// tests/user.test.js
const request = require('supertest');
const app = require('../app'); 
const pool = require('../config/db');

let testUserId;

describe('User API Tests', () => {
    beforeAll(async () => {
        // Create test user before running tests
        const [result] = await pool.execute(
            "INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)",
            ["testuser", "test@example.com", "user", "hashedpassword"]
        );
        testUserId = result.insertId;
    });

    afterAll(async () => {
        // Cleanup test data after tests
        await pool.execute("DELETE FROM users WHERE username = ?", ["testuser"]);
        await pool.end();
    });

    test('Create a new user', async () => {
        const res = await request(app)
            .post('/user')
            .send({ username: "newuser", email: "new@example.com", role: "user", password: "password123" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User Created Successfully');
    });

    test('Get all users', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('Get user by ID', async () => {
        const res = await request(app).get(`/user/${testUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User Fetch Successfully');
    });

    test('Update user by ID', async () => {
        const res = await request(app)
            .put(`/user/${testUserId}`)
            .send({ username: "updateduser", email: "updated@example.com", role: "admin", password: "newpassword" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User Updated Successfully');
    });

    test('Delete user by ID', async () => {
        const res = await request(app).delete(`/user/${testUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User Deleted Successfully');
    });
});
