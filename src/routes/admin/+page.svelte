<script>
    import { userStore as store } from '$lib/store'; 
    import { goto } from '$app/navigation';
    import Cookies from 'js-cookie'; 

    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin() {
        errorMessage = ''; 
        try {
            const response = await fetch("http://127.0.0.1:5000/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();   
            if (!response.ok) {
                throw new Error(data.message || "Login failed!");
            }

            const user = data.user;

            Cookies.set("user", JSON.stringify({
                name: user.username,
                email: user.email,
                id: user.id,
                token: data.token,
                role: user.role
            }), { expires: 1, path: '/' });

            store.set({
                name: user.username,
                email: user.email,
                id: user.id,
                token: data.token,
                role: user.role
            });

            goto("/dashboards"); 
        } 
        catch (error) {
            errorMessage = error.message;
            console.error("Login error:", error);
        }
    }
</script>

<div class="container">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h3 class="mb-0">Login</h3>
            </div>
            <div class="card-body">
                <form on:submit|preventDefault={handleLogin}>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="text" class="form-control" bind:value={email} required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" bind:value={password} required />
                    </div>
                    {#if errorMessage}
                        <p class="error text-danger">{errorMessage}</p>
                    {/if}
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
</div>

