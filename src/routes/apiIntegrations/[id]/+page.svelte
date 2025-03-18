<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores"; 
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
    let api = { 
        name: "", 
        endpoint_url: "", 
        method: "GET", 
        headers: "{}", 
        body: "{}", 
        authentication: "{}", 
        created_by: ""
    };

    let integrationId = ""; 
    let users = []; 

    $: integrationId = $page.params.id; 

    async function fetchApiIntegration() {
        if (!integrationId) return;
        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/apiintegration/${integrationId}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            if (response.ok) {
                const apidata = await response.json();
                api = {
                    ...apidata.data[0],
                    headers: JSON.stringify(apidata.data[0].headers, null, 2),
                    body: JSON.stringify(apidata.data[0].body, null, 2),
                    authentication: JSON.stringify(apidata.data[0].authentication, null, 2),
                };
                if (api.created_by) {
                    await fetchCreatedBy(api.created_by);
                }
                console.log(api);
            } else {
                alert("API Integration not found!");
            }
        } catch (error) {
            console.error("Error fetching API Integration:", error);
        }
    }

    async function fetchCreatedBy(userId) {
        try {
          const res = await fetch("http://127.0.0.1:5000/crm/user",{
            headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
          });
          const data = await res.json();
          users = data.data;
      } catch (error) {
          console.error("Error fetching users:", error);
      }
    }

    async function updateApiIntegration() {
        try {
            const { id, created_at, ...filteredApi } = api;
            const payload = {
                ...filteredApi,
                headers: JSON.parse(api.headers || "{}"),
                body: JSON.parse(api.body || "{}"),
                authentication: JSON.parse(api.authentication || "{}")
            };

            const response = await fetch(`http://127.0.0.1:5000/crm/apiintegration/${integrationId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${user?.token}`,  "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("API Integration updated successfully!");
            } else {
                alert("Failed to update API Integration");
            }
        } catch (error) {
            console.error("Error updating API Integration:", error);
        }
    }

    onMount(fetchApiIntegration);
</script>


<div class="container mt-5">
    <div class="card shadow-lg">
        <div class="card-header">
            <h4 class="mb-0">Update API Integration</h4>
        </div>
        <div class="card-body">
            <form on:submit|preventDefault={updateApiIntegration}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" bind:value={api.name} required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Endpoint URL</label>
                    <input type="url" class="form-control" bind:value={api.endpoint_url} required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Method</label>
                    <select class="form-select" bind:value={api.method}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Headers (JSON)</label>
                    <textarea class="form-control" rows="2" bind:value={api.headers}></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Body (JSON)</label>
                    <textarea class="form-control" rows="2" bind:value={api.body}></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Authentication (JSON)</label>
                    <textarea class="form-control" rows="2" bind:value={api.authentication}></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Created By</label>
                    <select class="form-control" bind:value={api.created_by}>
                        <option value="">Select User</option>
                        {#each users as user}
                            <option value={user.id}>{user.username}</option>
                        {/each}
                    </select>
                </div>
                <button type="submit" class="btn btn-warning">Update API Integration</button>
                <a href="/apiIntegrations"><button type="button" class="btn btn-danger">Cancel</button></a>
            </form>
        </div>
    </div>
</div>
