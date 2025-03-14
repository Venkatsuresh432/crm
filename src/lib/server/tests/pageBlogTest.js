const request = require('supertest');
const app = require('../app'); // Import your Express app
const pool = require('../config/db'); // Database connection

let testPageBlogId = null; // Store test blog ID

describe('Page Blog API Tests', () => {
    
    // ✅ Test Creating a Page Blog
    it('Should create a new page blog', async () => {
        const res = await request(app)
            .post('/pageblog')
            .send({
                category_id: "550e8400-e29b-41d4-a716-446655440000",
                subcategory_id: "550e8400-e29b-41d4-a716-446655440001",
                title: "Test Blog",
                content: "This is test content",
                metadata: { "tags": ["test", "nodejs"] },
                author_id: "550e8400-e29b-41d4-a716-446655440002",
                is_published: true
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("pageBlog Successfully Created");
        expect(res.body.data).toHaveProperty("id");

        testPageBlogId = res.body.data.id; // Store ID for next tests
    });

    // ✅ Test Fetching All Blogs
    it('Should return all page blogs', async () => {
        const res = await request(app).get('/pageblog');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    // ✅ Test Fetching a Single Blog
    it('Should return a single page blog', async () => {
        const res = await request(app).get(`/pageblog/${testPageBlogId}`);
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(testPageBlogId);
    });

    // ✅ Test Updating a Blog
    it('Should update the page blog', async () => {
        const res = await request(app)
            .put(`/pageblog/${testPageBlogId}`)
            .send({
                title: "Updated Blog Title",
                content: "Updated blog content"
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("pageBlog updated successfully");
    });

    // ✅ Test Deleting a Blog
    it('Should delete the page blog', async () => {
        const res = await request(app).delete(`/pageblog/${testPageBlogId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("pageBlog Deleted Successfully");
    });

});

// ✅ Close database connection after tests
afterAll(async () => {
    await pool.end();
});
