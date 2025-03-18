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

  let category_name = "";
  async function createCategory() {
    if (!category_name.trim()) {
      alert(" Category name cannot be empty!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/crm/blogcategory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category_name
        }),
      });
      if (response.ok) {
        alert("Category created successfully!");
        category_name = "";
        goto('/blogCategory')

      } else {
        alert("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }
</script>

<div class="row">
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Create Blog Category</h4>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="categoryInput">Category Name</label>
          <input type="text" class="form-control" id="categoryInput" placeholder="Enter category name"
            bind:value={category_name} required />
        </div>
        <div class="card-action mt-3">
          <button type="button" class="btn btn-success" on:click={createCategory}>Submit</button>
          <a href="/blogCategory" class="btn btn-danger">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</div>