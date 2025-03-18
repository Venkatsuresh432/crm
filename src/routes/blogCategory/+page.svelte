<script>
  import { onMount } from 'svelte';
  import { userStore } from '$lib/store';
  import { get } from 'svelte/store'; 
  import Cookies from "js-cookie";

    let user = null;
    $: user = $userStore;
    onMount(() => {
        if (!user) {
            const storedUser = Cookies.get("user");
            if (storedUser) {
                user = JSON.parse(storedUser);
                userStore.set(user);
            } else {
                goto("/"); 
            }
        }
    })


  let categories = [];

  async function fetchCategoryData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/crm/blogcategory",{
        headers: {
        Authorization: `Bearer ${user?.token}`, 
      }
      });
      const data = await response.json();
      categories = data.data;
      console.log("Categories fetched:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function deleteCategory(id) {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/crm/blogcategory/${id}`, {
          headers: {
              Authorization: `Bearer ${user.token}`, 
          },
          method: "DELETE",
        });
        if (response.ok) {
          alert("Category deleted successfully!");
          fetchCategoryData(); 
        } else {
          console.error("Error deleting category:", await response.text());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  onMount(fetchCategoryData);
</script>

<div class="card shadow-sm">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="card-title mb-0">Blog Categories</h5>
    <a href="/createBlogCategory">
      <button class="btn btn-primary">Add Category</button>
    </a>
  </div>
  <div class="card-body">
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table">
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Category</th>
            <th scope="col" class="text-center">Edit</th>
            <th scope="col" class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each categories as cat, index}
          <tr>
            <td>{index + 1}</td>
            <td>{cat.category_name}</td>
            <td class="text-center">
              <a href={`/blogCategory/${cat.id}`} class="btn btn-sm btn-warning">
                <i class="bi bi-pencil"></i> Edit
              </a>
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-danger" on:click={() => deleteCategory(cat.id)}>
                <i class="bi bi-trash"></i> Delete
              </button>
            </td>
          </tr>
          {:else}
          <tr>
            <td colspan="4" class="text-center text-muted">No categories found.</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

