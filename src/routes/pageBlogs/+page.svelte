<script>
    import { onMount } from "svelte";
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
    let blogs = [];
    let categories = {};
    let subcategories = {};
    let authors = {};

    async function fetchBlogs() {
        try {
            const res = await fetch("http://127.0.0.1:5000/crm/pageblog",{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            const data = await res.json();
            blogs = data?.data || [];
            console.log("blogs: ",data.data)
        } catch (error) {
            alert("Error fetching blogs. Please try again.");
            console.error("Error fetching blogs:", error);
        }
    }

    async function fetchCategories() {
        try {
            const res = await fetch("http://127.0.0.1:5000/crm/blogcategory",{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            const data = await res.json();
            console.log("Categories:", data);
            categories = Object.fromEntries((data?.data || []).map(cat => [cat.id, cat.category_name]));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function fetchSubcategories() {
        try {
            const res = await fetch("http://127.0.0.1:5000/crm/blogsubcategory",{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            const data = await res.json();
            console.log("Subcategories:", data);
            subcategories = Object.fromEntries((data?.data || []).map(sub => [sub.id, sub.sub_category_name]));
            console.log(subcategories)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    }

    async function fetchAuthors() {
        try {
            const res = await fetch("http://127.0.0.1:5000/crm/user",{
                headers: {
                    Authorization: `Bearer ${user?.token}`, 
                }
            });
            const data = await res.json();
            authors = Object.fromEntries((data?.data || []).map(author => [author.id, author.username]));
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    }

    async function deleteBlog(id) {
        if (confirm("Are you sure you want to delete this blog?")) {
            try {
                const res = await fetch(`http://127.0.0.1:5000/crm/pageblog/${id}`, {
                    headers: {
                    Authorization: `Bearer ${user?.token}`, 
                },
                    method: "DELETE"
                });

                if (res.ok) {
                    blogs = blogs.filter(blog => blog.id !== id);
                    alert("Blog deleted successfully.");
                } else {
                    alert("Error deleting blog. Please try again.");
                }
            } catch (error) {
                alert("Network error. Please try again.");
                console.error("Error deleting blog:", error);
            }
        }
    }

    onMount(() => {
        fetchBlogs();
        fetchCategories();
        fetchSubcategories();
        fetchAuthors();
    });
</script>

<div class="card shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Pages Blogs</h5>
        <a href="/createPageBlog">
            <button class="btn btn-primary">Add Blog</button>
        </a>
    </div>

    <div class="card-body">
        {#if blogs.length === 0}
            <p class="text-center text-muted">No blogs found.</p>
        {:else}
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="table">
                        <tr>
                            <th>Sno</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each blogs as blog, index}
                        <tr>
                            <td>{index + 1}</td>
                            <td>{blog.title}</td>
                            <td>{categories[blog.category_id] || "Unknown"}</td>
                            <td>{subcategories[blog.subcategory_id] || "N/A"}</td>
                            <td>{authors[blog.author_id] || "Unknown"}</td>
                            <td>
                                <span class="badge {blog.is_published ? 'bg-success' : 'bg-secondary'}">
                                    {blog.is_published ? "Published" : "Draft"}
                                </span>
                            </td>
                            <td>
                                <a href={`/pageBlogs/${blog.id}`} class="text-primary">
                                    <i class="bi bi-pencil"></i>
                                </a>
                            </td>
                            <td>
                                <a href="#" on:click={() => deleteBlog(blog.id)} class="text-danger">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</div>
