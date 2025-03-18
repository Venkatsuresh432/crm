<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
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
    let blogCategories = [];  
    let selectedCategory = ''; 
    let subCategoryName = '';  

  async function fetchCategories() {
      try {
          const response = await fetch('http://127.0.0.1:5000/crm/blogcategory',{
            headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
          });
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

          const data = await response.json();
          if (!data?.data) throw new Error('No valid data received');

          blogCategories = data.data;
          selectedCategory = blogCategories.length > 0 ? blogCategories[0].id : '';  
      } catch (error) {
          console.error('Error fetching categories:', error);
          alert("Failed to load categories.");
      }
  }

  onMount(fetchCategories);


  async function createSubCategory(event) {
      event.preventDefault();

      if (!selectedCategory || !subCategoryName.trim()) {
          alert("Please select a category and enter a subcategory name.");
          return;
      }
      const subCategoryData = {
          blog_category_id: selectedCategory,
          sub_category_name: subCategoryName,
      };
      try {
          const response = await fetch('http://127.0.0.1:5000/crm/blogsubcategory', {
              method: "POST",
              headers: {Authorization: `Bearer ${user?.token}`,  "Content-Type": "application/json" },
              body: JSON.stringify(subCategoryData)
          });

          if (!response.ok) throw new Error(`Failed to create subcategory! Status: ${response.status}`);

          alert("Subcategory created successfully!");
          goto('/blogSubCategory')
          subCategoryName = '';  
      } catch (error) {
          console.error('Error creating subcategory:', error);
          alert("Failed to create subcategory.");
      }
  }
</script>

<div class="row">
  <div class="col-md-12">
      <div class="card">
          <div class="card-header">
              <div class="card-title">Blog Sub Category Creation</div>
          </div>
          <div class="card-body">
              <form on:submit={createSubCategory}>
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
                      <button type="submit" class="btn btn-success">Submit</button>
                      <a href="/blogSubCategory" class="btn btn-danger">Cancel</a>
                  </div>
              </form>
          </div>
      </div>
  </div>
</div>
