<script>
    import { onMount } from "svelte";
    import { userStore } from '$lib/store';
    import { get } from 'svelte/store'; 
    import Cookies from "js-cookie";
	import { goto } from "$app/navigation";

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
  
    let users = []; 
  
    async function fetchUsers() {
        try {
            const response = await fetch("http://127.0.0.1:5000/crm/user",{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            const data = await response.json();
            users = data?.data || [];
            console.log(users)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
  
    async function createApiIntegration() {
    try {
        const { id, created_at, ...filteredPayload } = api;  
        const payload = {
            ...api,
            headers: typeof api.headers === "string" ? JSON.parse(api.headers) : api.headers,
            body: typeof api.body === "string" ? JSON.parse(api.body) : api.body,
            authentication: typeof api.authentication === "string" ? JSON.parse(api.authentication) : api.authentication
        };

        const response = await fetch("http://127.0.0.1:5000/crm/apiintegration", {
            method: "POST",
            headers: {Authorization: `Bearer ${user?.token}`,  "Content-Type": "application/json" },
            body: JSON.stringify(payload),  // Send correctly formatted JSON
        });

        const result = await response.json();

        if (response.ok) {
            alert("API Integration created successfully!");
            api = { name: "", endpoint_url: "", method: "GET", headers: "{}", body: "{}", authentication: "{}", created_by: "" };
            goto('/apiIntegrations')
        } else {
            alert(`Failed to create API Integration: ${result.error.join(", ")}`);
        }
    } catch (error) {
        console.error("Error creating API Integration:", error);
    }
}
  
    onMount(fetchUsers);
  </script>
  
  <div class="container mt-5">
    <div class="card shadow-lg">
        <div class="card-header">
            <h4 class="mb-0">Create API Integration</h4>
        </div>
        <div class="card-body">
            <form on:submit|preventDefault={createApiIntegration}>
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
                    <select class="form-select" bind:value={api.created_by} required>
                        <option value="">Select User</option>
                        {#each users as user}
                            <option value={user.id}>{user.username}</option>
                        {/each}
                    </select>
                </div>
                <button type="submit" class="btn btn-success">Create API Integration</button>
                <a href="/apiIntegrations"><button type="button" class="btn btn-danger">Cancel</button></a>
            </form>
        </div>
    </div>
  </div>
  