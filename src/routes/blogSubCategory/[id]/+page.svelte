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
    let subCategoryId = '';
    let blogCategories = [];
    let selectedCategory = '';
    let subCategoryName = '';


    async function fetchSubCategory() {
        subCategoryId = $page.params.id;
        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/blogsubcategory/${subCategoryId}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            if (!response.ok) throw new Error(`Failed to fetch! Status: ${response.status}`);

            const data = await response.json();
            if (!data?.data) throw new Error('Invalid data received');
            const datalist = data.data
            console.log(datalist)
            selectedCategory = datalist[0].blog_category_id;
            subCategoryName = datalist[0].sub_category_name;
        } catch (error) {
            console.error('Error fetching subcategory:', error);
            alert("Failed to load subcategory.");
        }
    }


    async function fetchCategories() {
        try {
            const response = await fetch('http://127.0.0.1:5000/crm/blogcategory',{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (!data?.data) throw new Error('No valid categories received');

            blogCategories = data.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert("Failed to load categories.");
        }
    }

    onMount(() => {
        fetchSubCategory();
        fetchCategories();
    });

    // Update subcategory
    async function updateSubCategory(event) {
        event.preventDefault();

        if (!selectedCategory || !subCategoryName.trim()) {
            alert("Please select a category and enter a subcategory name.");
            return;
        }

        const updatedData = {
            blog_category_id: selectedCategory,
            sub_category_name: subCategoryName,
        };

        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/blogsubcategory/${subCategoryId}`, {
                method: "PUT",
                headers: {   Authorization: `Bearer ${user?.token}`, "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) throw new Error(`Update failed! Status: ${response.status}`);
            alert("Subcategory updated successfully!");
            goto('/blogSubCategory')
        } catch (error) {
            console.error('Error updating subcategory:', error);
            alert("Failed to update subcategory.");
        }
    }
</script>


<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="card-title">Update Blog Subcategory</div>
            </div>
            <div class="card-body">
                <form on:submit={updateSubCategory}>
                    <div class="form-group">
                        <label for="categorySelect">Select Blog Category</label>
                        <select class="form-select" id="categorySelect" bind:value={selectedCategory}>
                            {#each blogCategories as category}
                                <option value={category.id}>{category.category_name}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="form-group form-inline">
                        <label for="subCategoryInput" class="col-md-3 col-form-label">Subcategory Name</label>
                        <div class="col-md-9 p-0">
                            <input type="text" class="form-control input-full" id="subCategoryInput"
                                bind:value={subCategoryName} placeholder="Enter Subcategory Name" />
                        </div>
                    </div>

                    <div class="card-action">
                        <button type="submit" class="btn btn-success">Update</button>
                        <a href="/blogSubCategory" class="btn btn-danger">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
