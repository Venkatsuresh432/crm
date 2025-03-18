<script>
    "use strict";
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

    let title = "";
    let content = "";
    let category_id = "";
    let subcategory_id = "";
    let author_id = "";
    let is_published = false;
    let metadata = "{}";
    let categories = [];
    let subcategories = [];
    let authors = [];

    async function fetchData() {
        try {
            const [categoriesRes, authorsRes] = await Promise.all([
                fetch("http://127.0.0.1:5000/crm/blogcategory",{
                    headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
                }),
                fetch("http://127.0.0.1:5000/crm/user",{
                    headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
                })
            ]);

            const categoriesData = await categoriesRes.json();
            const authorsData = await authorsRes.json();

            categories = categoriesData.data;
            authors = authorsData.data;
            
            console.log("Categories:", categories);
            console.log("Authors:", authors);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function fetchSubcategories() {
        if (!category_id) {
            subcategories = [];
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/blogsubcategory?category_id=${category_id}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            const subdata = await response.json();
            subcategories = subdata.data;
            console.log("Subcategories:", subcategories);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            subcategories = [];
        }
    }

    onMount(fetchData);

    async function createPageBlog(event) {
        event.preventDefault();

        let newBlog = {
            title,
            content,
            category_id,
            subcategory_id,
            author_id,
            is_published,
            metadata: JSON.parse(metadata)
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/crm/pageblog", {
                method: "POST",
                headers: {Authorization: `Bearer ${user?.token}`,  "Content-Type": "application/json" },
                body: JSON.stringify(newBlog)
            });

            if (response.ok) {
                alert("Blog created successfully!");
                newBlog = null
                goto('/pageBlogs') 
            } 
            else {
                console.error("Error creating blog:", await response.text());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div class="card">
    <div class="card-header">
        <h5 class="card-title">Create New Page Blog</h5>
    </div>
    <div class="card-body">
        <form on:submit={createPageBlog}>
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" bind:value={title} required />
            </div>

            <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea class="form-control" rows="4" bind:value={content} required></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Category</label>
                <select class="form-select" bind:value={category_id} on:change={() => fetchSubcategories()} required>
                    <option value="">Select Category</option>
                    {#each categories as category}
                    <option value={category.id}>{category.category_name}</option>
                    {/each}
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Subcategory</label>
                <select class="form-select" bind:value={subcategory_id} disabled={subcategories.length === 0}>
                    <option value="">Select Subcategory</option>
                    {#each subcategories as subcategory}
                        <option value={subcategory.id}>{subcategory.sub_category_name}</option>
                    {/each}
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Author</label>
                <select class="form-select" bind:value={author_id} required>
                    <option value="">Select Author</option>
                    {#each authors as author}
                        <option value={author.id}>{author.username}</option>
                    {/each}
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Metadata (JSON format)</label>
                <textarea class="form-control" rows="2" bind:value={metadata}></textarea>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" bind:checked={is_published} />
                <label class="form-check-label">Publish Immediately</label>
            </div>

            <button type="submit" class="btn btn-success">Create Blog</button>
            <a href="/pageBlogs" class="btn btn-secondary ms-2">Cancel</a>
        </form>
    </div>
</div>
