<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { userStore } from '$lib/store';
    import { get } from 'svelte/store'; 
    import Cookies from "js-cookie";
	import { goto } from '$app/navigation';

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

    async function fetchData() {
        categoryId = $page.params.id; 
        console.log("Fetching category with ID:", categoryId);

        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/blogcategory/${categoryId}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            if (!data?.data) throw new Error('No valid data received from API');

            post = data.data[0];
            console.log(post)
            category_name = post.category_name || '';  
            console.log("Fetched Category Name:", category_name);
            goto('/blogCategory')
        } catch (error) {
            console.error('Error fetching category:', error);
            alert("Failed to fetch category data.");
        }
    }
    onMount(fetchData);  

    async function updateCategory(event) {
        event.preventDefault();
            alert(JSON.stringify(post, null, 2));
        if (!post || !post.id) {
            console.error('Invalid post data, cannot update.');
            alert("Error: No category data available.");
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/blogcategory/${post.id}`,{
                method: "PUT",
                headers: { Authorization: `Bearer ${user.token}`,"Content-Type": "application/json" },
                body: JSON.stringify({ category_name })
            });

            if (!response.ok) throw new Error(`Update failed! Status: ${response.status}`);
            alert("Category updated successfully!");
        } catch (error) {
            console.error('Error updating category:', error.message);
            alert(`Failed to update category.${error.message}`);
        }
    }
</script>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="card-title">Blog Category Update</div>
            </div>
            <div class="card-body">
                <form on:submit={updateCategory}>
                    <div class="form-group form-inline">
                        <label for="inlineinput" class="col-md-3 col-form-label">Category</label>
                        <div class="col-md-9 p-0">
                            <input type="text" class="form-control input-full" id="inlineinput"
                                bind:value={ category_name } placeholder="Enter Category Name" />
                        </div>
                    </div>
                    <div class="card-action">
                        <button type="submit" class="btn btn-success">Submit</button>
                        <a href="/blogCategory" class="btn btn-danger">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
