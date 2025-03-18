<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

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
    let post = null;
    let category_name = '';
    let categoryId = '';
  let subcategories = [];
  let categories = {};

  async function fetchData() {
    try {
      // Fetch subcategories and categories together
      const [subcatRes, catRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/crm/blogsubcategory",{
          headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
        }),
        fetch("http://127.0.0.1:5000/crm/blogcategory",{
          headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
        })
      ]);

      const subcatData = await subcatRes.json();
      const catData = await catRes.json();

      subcategories = subcatData.data;
      
      // Convert categories into a dictionary {id: name}
      categories = catData.data.reduce((acc, cat) => {
        acc[cat.id] = cat.category_name;
        return acc;
      }, {});

      console.log("Subcategories:", subcategories);
      console.log("Categories:", categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteSubcategory(id) {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/crm/blogsubcategory/${id}`, {
          headers: {
                    Authorization: `Bearer ${user?.token}`, 
                },
          method: "DELETE",
        });
        if (response.ok) {
          alert("Subcategory deleted successfully!");
          fetchData(); // Refresh data after deletion
        } else {
          console.error("Error deleting subcategory:", await response.text());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  onMount(fetchData);
</script>

<div class="card shadow-sm">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="card-title mb-0">Blog Subcategories</h5>
    <a href="/createBlogSubCategory">
      <button class="btn btn-primary">Add Subcategory</button>
    </a>
  </div>
  <div class="card-body">
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table">
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Category</th>
            <th scope="col">Subcategory</th>
            <th scope="col" class="text-center">Edit</th>
            <th scope="col" class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each subcategories as subcat, index}
          <tr>
            <td>{index + 1}</td>
            <td>{categories[subcat.blog_category_id] || "Unknown"}</td>
            <td>{subcat.sub_category_name}</td>
            <td class="text-center">
              <a href={`/blogSubCategory/${subcat.id}`} class="btn btn-sm btn-warning">
                <i class="bi bi-pencil"></i> Edit
              </a>
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-danger" on:click={() => deleteSubcategory(subcat.id)}>
                <i class="bi bi-trash"></i> Delete
              </button>
            </td>
          </tr>
          {:else}
          <tr>
            <td colspan="5" class="text-center text-muted">No subcategories found.</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
