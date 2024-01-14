

<script lang="ts">

    const login = async () => {
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ""
    })
    .then(() => window.location.href = "/account")
}
</script>

<button on:click={login}>Login</button>
