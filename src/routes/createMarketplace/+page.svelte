<script>
    import { error } from "console";
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
              window.location.href = '/';
            }
        }
    })

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
          const res = await fetch("http://127.0.0.1:5000/crm/user",{
            headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
          });
          const data = await res.json();
          $: users = data.data;
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  }

  async function createApp() {
      try {
          const payload = {
              ...app,
              security_groups_admin: app.security_groups_admin.split(",").map(s => s.trim()), 
              security_groups_user: app.security_groups_user.split(",").map(s => s.trim())
          };
          console.log(payload)
         const response = await fetch("http://127.0.0.1:5000/crm/marketplace", {
              method: "POST",
              headers: { Authorization: `Bearer ${user?.token}`,"Content-Type": "application/json" },
              body: JSON.stringify(payload),
          });

          const data = await response.json();
          console.log("updated data: ", data)
          if(!response.ok) {
            throw new Error(`server error ${data.message || "Unknown error"}`)
          }
          app = {app_name: '',description: '',app_type: '',icon_url: '',iframe_url: '',security_groups_admin: '', security_groups_user: '',created_by: ''};
          alert("App created successfully!");
          goto('/marketplace')
      } catch (error) {
          console.error("Error creating app:", error);
          alert("Failed to create app.");
      }
  }
  onMount(fetchUsers);
</script>

<div class="card">
  <div class="card-header">Create Marketplace App</div>
  <div class="card-body">
      <form on:submit|preventDefault={createApp}>
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
          <button type="submit" class="btn btn-success">Create</button>
          <a href="/marketplace" class="btn btn-danger">Cancel</a>
      </form>
  </div>
</div>
