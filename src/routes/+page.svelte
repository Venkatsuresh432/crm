<script>
    import { goto } from "$app/navigation";
    
    function goToLogin() {
        goto("/admin"); 
    }
</script>

<div class="main-container">
    <div class="content">
        <h1>Welcome to My App</h1>
        <p>Click below to log in</p>
        <button class="btn btn-primary" on:click={goToLogin}>Login</button>
    </div>
</div>
<style>
    .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
    }

    /* .content {
        max-width: 400px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background: white;
    } */

    h1 {
        margin-bottom: 10px;
    }

    p {
        color: #666;
        margin-bottom: 20px;
    }

    .btn {
        width: 100%;
        padding: 10px;
        font-size: 18px;
    }
</style>
