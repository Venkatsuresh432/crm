const request = require('supertest');
const app = require('../server'); // Import your Express app
const userAuditModel = require('../models/userAuditModel'); // Your model file

jest.mock('../models/userAuditModel'); // Mock database calls

describe('User Audit API Tests', () => {
    const mockAudit = { id: '123e4567-e89b-12d3-a456-426614174000', user_id: 'user-123', action_message: 'Test Action' };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    // ✅ Test - Create User Audit
    it('should create a new user audit', async () => {
        userAuditModel.createUserAudit.mockResolvedValue(mockAudit);

        const res = await request(app)
            .post('/useraudit')
            .send({ user_id: 'user-123', action_message: 'Test Action' });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User Audit Successfully Created');
        expect(res.body.data).toMatchObject(mockAudit);
    });

    // ✅ Test - Fetch All User Audits
    it('should fetch all user audits', async () => {
        userAuditModel.getAllUsersAudit.mockResolvedValue([mockAudit]);

        const res = await request(app).get('/useraudit');

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data).toEqual([mockAudit]);
    });

    // ✅ Test - Fetch User Audit by ID
    it('should fetch a user audit by ID', async () => {
        userAuditModel.getUserAuditById.mockResolvedValue([mockAudit]);

        const res = await request(app).get(`/useraudit/${mockAudit.id}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User Audit Fetched Successfully');
        expect(res.body.data).toMatchObject(mockAudit);
    });

    // ❌ Test - Fetch Non-existing User Audit
    it('should return 404 if user audit is not found', async () => {
        userAuditModel.getUserAuditById.mockResolvedValue([]);

        const res = await request(app).get('/useraudit/invalid-id');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User Audit Not Found');
    });

    // ✅ Test - Update User Audit
    it('should update a user audit', async () => {
        userAuditModel.updateUserAudit.mockResolvedValue(true);

        const res = await request(app)
            .put(`/useraudit/${mockAudit.id}`)
            .send({ action_message: 'Updated Action' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User Audit updated successfully');
    });

    // ❌ Test - Update Non-existing Audit
    it('should return 404 if updating a non-existing user audit', async () => {
        userAuditModel.updateUserAudit.mockResolvedValue(false);

        const res = await request(app)
            .put('/useraudit/non-existent-id')
            .send({ action_message: 'Updated Action' });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User Audit Not Found');
    });

    // ✅ Test - Delete User Audit
    it('should delete a user audit', async () => {
        userAuditModel.deleteUserAudit.mockResolvedValue(true);

        const res = await request(app).delete(`/useraudit/${mockAudit.id}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User Audit Deleted Successfully');
    });

    // ❌ Test - Delete Non-existing Audit
    it('should return 404 if deleting a non-existing user audit', async () => {
        userAuditModel.deleteUserAudit.mockResolvedValue(false);

        const res = await request(app).delete('/useraudit/non-existent-id');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User Audit Not Found');
    });
});
