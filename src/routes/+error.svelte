<script>
    import { page } from '$app/stores';
</script>

<h1>{$page.error.message}</h1>
<h3>{$page.error.status}</h3>