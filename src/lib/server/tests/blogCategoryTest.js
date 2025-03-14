const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

beforeAll(async () => {
  await pool.execute("DELETE FROM blog_category");
});

afterAll(async () => {
  await pool.end();
});

describe("Blog Category API Tests", () => {
  let categoryId;

  test("Should create a new blog category", async () => {
    const res = await request(app)
      .post("/api/blogcategory")
      .send({ category_name: "Tech" });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("category_name", "Tech");
    categoryId = res.body.data.id;
  });

  test("Should fetch all blog categories", async () => {
    const res = await request(app).get("/api/blogcategory");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("Should fetch a blog category by ID", async () => {
    const res = await request(app).get(`/api/blogcategory/${categoryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].id).toBe(categoryId);
  });

  test("Should update a blog category", async () => {
    const res = await request(app)
      .put(`/api/blogcategory/${categoryId}`)
      .send({ category_name: "Updated Tech" });
    
    expect(res.statusCode).toBe(200);
  });

  test("Should delete a blog category", async () => {
    const res = await request(app).delete(`/api/blogcategory/${categoryId}`);
    expect(res.statusCode).toBe(200);
  });
});
