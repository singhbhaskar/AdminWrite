<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
        const navs = Array.from(document.body.querySelectorAll(".navLink"));
        navs.forEach((nav) => {
            nav.classList.remove("is-selected");
        });
        const databaseNav = Array.from(document.body.querySelectorAll("#nav-database"))[0].classList.add("is-selected");
    });
</script>

<slot />
