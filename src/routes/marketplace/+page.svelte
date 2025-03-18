<script>
  import { onMount } from 'svelte';
  import { userStore } from '$lib/store';
  import { get } from 'svelte/store'; 
  import Cookies from "js-cookie";
  import { goto } from '$app/navigation';

    let user = get(userStore);
    // $: user = $userStore;
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
  let marketplace = [];
  let creators = {};  

  async function fetchMarketplaceData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/crm/marketplace",{
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await response.json();
      marketplace = data.data;

      
      await Promise.all(
        marketplace.map(async (app) => {
          if (app.created_by && !creators[app.created_by]) {
            creators[app.created_by] = "Loading...";
            creators[app.created_by] = await fetchCreatorData(app.created_by);
          }
        })
      );
    } catch (error) {
      console.log("Error fetching marketplace data:", error);
    }
  }

  async function fetchCreatorData(userId) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/crm/user/${userId}`,{
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const userData = await response.json();
      return userData?.data[0]?.username || "Unknown"; 
    } catch (error) {
      console.error("Error fetching creator data:", error);
      return "Unknown";
    }
  }

  async function deleteApp(id) {
    if (confirm("Are you sure you want to delete this app?")) {
      try {
        await fetch(`http://127.0.0.1:5000/crm/marketplace/${id}`, {
          headers: {
                    Authorization: `Bearer ${user?.token}`, 
                },
          method: "DELETE"
        });
        fetchMarketplaceData();
      } catch (error) {
        console.error("Error deleting app:", error);
      }
    }
  }

  onMount(fetchMarketplaceData);
</script>

<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="card-title">Marketplace Apps</h5>
    <a href="/createMarketplace" sveltekit:prefetch={false} ><button class="btn btn-primary">Add App</button></a>
  </div>
  <div class="card-body">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Sno</th>
          <th scope="col">App Name</th>
          <th scope="col">Description</th>
          <th scope="col">App Type</th>
          <th scope="col">Created By</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each marketplace as app, index}
        <tr>
          <td>{index + 1}</td>
          <td>{app.app_name}</td>
          <td>{app.description}</td>
          <td>{app.app_type}</td>
          <td>{creators[app.created_by] || "Loading..."}</td>
          <td>
            <a href={`/marketplace/${app.id}`}>
              <i class="bi bi-pencil"></i>
            </a>
          </td>
          <td>
            <a href="#" on:click={() => deleteApp(app.id)}>
              <i class="bi bi-trash text-danger"></i>
            </a>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
