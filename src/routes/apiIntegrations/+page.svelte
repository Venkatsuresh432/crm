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
  let apiIntegrations = [];

  async function fetchApiIntegrations() {
    try {
      const response = await fetch("http://127.0.0.1:5000/crm/apiintegration",{
        headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
      });
      const data = await response.json();
      apiIntegrations = data.data;
    } catch (error) {
      console.error("Error fetching API Integrations:", error);
    }
  }

  onMount(fetchApiIntegrations);

  async function deleteApi(id) {
    if (confirm("Are you sure you want to delete this API integration?")) {
      try {
        await fetch(`http://127.0.0.1:5000/api_integrations/${id}`, {
          headers: {
                    Authorization: `Bearer ${user?.token}`, 
                },
          method: "DELETE"
        });
        fetchApiIntegrations();
      } catch (error) {
        console.error("Error deleting API integration:", error);
      }
    }
  }
</script>

<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="card-title">API Integrations</h5>
    <a href="/createApiintegration"><button class="btn btn-primary">Add API Integration</button></a>
  </div>
  <div class="card-body">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Sno</th>
          <th scope="col">Name</th>
          <th scope="col">Endpoint URL</th>
          <th scope="col">Method</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each apiIntegrations as api, index}
        <tr>
          <td>{index + 1}</td>
          <td>{api.name}</td>
          <td>{api.endpoint_url}</td>
          <td>{api.method}</td>
          <td>
            <a href={`/apiIntegrations/${api.id}`}>
              <i class="bi bi-pencil"></i>
            </a>
          </td>
          <td>
            <a href="#" on:click={() => deleteApi(api.id)}>
              <i class="bi bi-trash text-danger"></i>
            </a>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

