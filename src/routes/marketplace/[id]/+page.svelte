<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores"; 
    import { goto } from "$app/navigation";
    import { userStore } from '$lib/store';
    import { get } from 'svelte/store'; 
    import Cookies from "js-cookie";
  
    let user = get(userStore); 
    let appId = "";
    $: appId = get(page).params.id; 
  
    let app = {
        app_name: '',
        description: '',
        app_type: '',
        icon_url: '',
        iframe_url: '',
        security_groups_admin: '',
        security_groups_user: '',
        created_by: '',
    };
    let users = [];
    async function fetchUsers() {
        try {
            const res = await fetch("http://127.0.0.1:5000/crm/user", {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            $: users = data.data;
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    }
    async function fetchAppData() {
        if (!appId) return;
        try {
            const res = await fetch(`http://127.0.0.1:5000/crm/marketplace/${appId}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const datas = await res.json();
            if (!datas.data || datas.data.length === 0) {
                alert("App not found!");
                goto("/marketplace");
                return;
            }
            const data = datas.data[0];
            app = {
                ...data,
                security_groups_admin: data.security_groups_admin.join(", "),
                security_groups_user: data.security_groups_user.join(", ")
            };
        } catch (error) {
            console.log("Error fetching app:", error);
        }
    }
  
    async function updateApp() {
        try {
            const { id, created_at, updated_at, ...filteredApp } = app; 
            const payload = {
                ...filteredApp,
                security_groups_admin: typeof app.security_groups_admin === "string" 
                    ? app.security_groups_admin.split(",").map(s => s.trim()).filter(Boolean) 
                    : [],
                security_groups_user: typeof app.security_groups_user === "string" 
                    ? app.security_groups_user.split(",").map(s => s.trim()).filter(Boolean) 
                    : []
            };
            const response = await fetch(`http://127.0.0.1:5000/crm/marketplace/${appId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${user?.token}`, "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
  
            if (!response.ok) {
                const errorResponse = await response.json();
                console.log("Update failed:", errorResponse);
                alert(`Failed to update app: ${errorResponse.error || "Unknown error"}`);
                return;
            }
            alert("App updated successfully!");
            goto("/marketplace");
        } catch (error) {
            console.log("Error updating app:", error);
            alert("Failed to update app.");
        }
    }
  
    onMount(() => {
        fetchUsers();
        fetchAppData();
    });
  </script>
  
<div class="card">
  <div class="card-header ">Update Marketplace App</div>
  <div class="card-body">
      <form on:submit|preventDefault={updateApp}>
          <div class="mb-3">
              <label class="form-label">App Name</label>
              <input type="text" class="form-control" bind:value={app.app_name} required />
          </div>

          <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" bind:value={app.description}></textarea>
          </div>

          <div class="mb-3">
              <label class="form-label">App Type</label>
              <select class="form-control" bind:value={app.app_type}>
                  <option value="streamlit">Streamlit</option>
                  <option value="native">Native</option>
                  <option value="others">Others</option>
              </select>
          </div>

          <div class="mb-3">
              <label class="form-label">Icon URL</label>
              <input type="url" class="form-control" bind:value={app.icon_url} placeholder="https://example.com/icon.png" />
          </div>

          <div class="mb-3">
              <label class="form-label">Iframe URL</label>
              <input type="url" class="form-control" bind:value={app.iframe_url} placeholder="https://example.com/iframe" />
          </div>

          <div class="mb-3">
              <label class="form-label">Admin Security Groups (Comma Separated)</label>
              <input type="text" class="form-control" bind:value={app.security_groups_admin} placeholder="admin1,admin2" />
          </div>

          <div class="mb-3">
              <label class="form-label">User Security Groups (Comma Separated)</label>
              <input type="text" class="form-control" bind:value={app.security_groups_user} placeholder="user1,user2" />
          </div>

          <div class="mb-3">
              <label class="form-label">Created By</label>
              <select class="form-control" bind:value={app.created_by}>
                  <option value="">Select User</option>
                  {#each users as user}
                      <option value={user.id}>{user.username}</option>
                  {/each}
              </select>
          </div>
          <button type="submit" class="btn btn-warning">Update</button>
          <a href="/marketplace" class="btn btn-danger">Cancel</a>
      </form>
  </div>
</div>
