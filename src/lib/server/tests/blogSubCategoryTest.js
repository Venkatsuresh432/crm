const request = require("supertest");
const app = require("../server"); // Ensure your Express app is correctly exported

let testSubCategoryId = "";
const testCategoryId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with a valid category ID

describe("Blog SubCategory API Tests", () => {
  // ✅ Test: Create a Sub-Category
  it("should create a new blog sub-category", async () => {
    const response = await request(app)
      .post("/api/blogsubcategory")
      .send({
        blog_category_id: testCategoryId,
        sub_category_name: "Test Category",
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("id");

    testSubCategoryId = response.body.data.id;
  });

  // ✅ Test: Get All Sub-Categories
  it("should fetch all blog sub-categories", async () => {
    const response = await request(app).get("/api/blogsubcategory");
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  // ✅ Test: Get Sub-Category by ID
  it("should fetch a sub-category by ID", async () => {
    const response = await request(app).get(`/api/blogsubcategory/${testSubCategoryId}`);
    expect(response.status).toBe(200);
    expect(response.body.data[0].id).toBe(testSubCategoryId);
  });

  // ✅ Test: Update Sub-Category
  it("should update a sub-category", async () => {
    const response = await request(app)
      .put(`/api/blogsubcategory/${testSubCategoryId}`)
      .send({ sub_category_name: "Updated Category" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("subBlog updated successfully");
  });

  // ✅ Test: Delete Sub-Category
  it("should delete a sub-category", async () => {
    const response = await request(app).delete(`/api/blogsubcategory/${testSubCategoryId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("subBlog Deleted Successfully");
  });
});
