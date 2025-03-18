<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
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

    let blogId = ""; 
    let title = "";
    let content = "";
    let category_id = "";
    let subcategory_id = "";
    let author_id = "";
    let is_published = '';
    let metadata = "{}";
    let categories = [];
    let subcategories = [];
    let authors = [];
   
    async function fetchData() {
        try {
            const [categoriesRes, authorsRes] = await Promise.all([
                fetch("http://127.0.0.1:5000/crm/blogcategory",{
                    headers: {
                    Authorization: `Bearer ${user.token}`, 
                }
                }),
                fetch("http://127.0.0.1:5000/crm/user",{
                    headers: {
                        Authorization: `Bearer ${user.token}`, 
                    }
                })
            ]);

            const categoriesData = await categoriesRes.json();
            const authorsData = await authorsRes.json();

            categories = categoriesData.data;
            authors = authorsData.data;
            // console.log(categories)
            // console.log(authors)
            await fetchBlogData();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function fetchBlogData() {
        try {
            blogId = $page.params.id;
            const response = await fetch(`http://127.0.0.1:5000/crm/pageblog/${blogId}`,{
                headers: {
                        Authorization: `Bearer ${user.token}`, 
                    }
            });
            const blogList = await response.json();
            const blog = blogList.data
            title = blog.title;
            content = blog.content;
            category_id = blog.category_id;
            subcategory_id = blog.subcategory_id;
            author_id = blog.author_id;
            is_published = blog.is_published;
            metadata = JSON.stringify(blog.metadata);

            await fetchSubcategories();
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    }

    async function fetchSubcategories() {
        if (!category_id) {
            subcategories = [];
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/blogsubcategory/?category_id=${category_id}`,{
            headers: {
                Authorization: `Bearer ${user.token}`, 
            }
            });
            const subdata = await response.json();
            subcategories = subdata.data;
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            subcategories = [];
        }
    }

    onMount(fetchData);
    
    async function updateBlog(event) {
        event.preventDefault();
        const updatedBlog = {
            title,
            content,
            category_id,
            subcategory_id,
            is_published: Boolean(is_published),
            metadata: JSON.parse(metadata)
        }; //author_id
     
        try {
            const response = await fetch(`http://127.0.0.1:5000/crm/pageblog/${blogId}`, {
                method: "PUT",
                headers: {  Authorization: `Bearer ${user.token}`,"Content-Type": "application/json" },
                body: JSON.stringify(updatedBlog)
            });

            if (response.ok) {
                alert("Blog updated successfully!");
                window.location.href = "/pageBlogs"; 
            } else {
                console.error("Error updating blog:", await response.text());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div class="card">
    <div class="card-header">
        <h5 class="card-title">Update Page Blog</h5>
    </div>
    <div class="card-body">
        <form on:submit={updateBlog}>
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

            <!-- <div class="mb-3">
                <label class="form-label">Author</label>
                <select class="form-select" bind:value={author_id} required>
                    <option value="">Select Author</option>
                    {#each authors as author}
                        <option value={author.id}>{author.username}</option>
                    {/each}
                </select>
            </div> -->

            <div class="mb-3">
                <label class="form-label">Metadata (JSON format)</label>
                <textarea class="form-control" rows="2" bind:value={metadata}></textarea>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" bind:checked={is_published} />
                <label class="form-check-label">Publish Immediately</label>
            </div>

            <button type="submit" class="btn btn-success">Update Blog</button>
            <a href="/pageBlogs" class="btn btn-secondary ms-2">Cancel</a>
        </form>
    </div>
</div>
