<script lang="ts">
	import '../app.css';
	import '@appwrite.io/pink';
	import '@appwrite.io/pink-icons';
	import { onMount } from 'svelte';

	let isDark = true;
	let isMenuOpened: null | boolean = null;

	onMount(() => {
		const navs = Array.from(document.body.querySelectorAll(".navLink"));
		navs.forEach((nav) => {
			nav.classList.remove("is-selected");
		});
		const databaseNav = Array.from(document.body.querySelectorAll("#nav-project"))[0].classList.add("is-selected");
  	});

	function toggleTheme() {
		if (isDark) {
			document.body.classList.remove('theme-dark');
		} else {
			document.body.classList.add('theme-dark');
		}

		isDark = document.body.classList.contains('theme-dark');
	}

	function toggleMenu() {
		if (isMenuOpened === null) {
			isMenuOpened = true;
		} else {
			isMenuOpened = !isMenuOpened;
		}
	}

</script>

<div class="grid-with-side">
	<header class="main-header u-padding-inline-end-0">
		<button
			on:click={toggleMenu}
			class="button is-text is-only-icon is-not-desktop nav-btn"
			aria-label="Open Menu"
		>
			<span aria-hidden="true" class="icon-menu" />
		</button>
		<a class="logo" href="/">
			<img src="/logo.svg" alt="Logo" />
		</a>
		<div class="main-header-end u-margin-inline-end-16">
			<ul class="buttons-list is-with-padding">
				
				<li class="buttons-list-item u-padding-inline-0">
					<div>
						{#if isDark}
							<div>
								<button
									on:click={toggleTheme}
									class="button is-only-icon is-text"
									aria-label="Replace to Dark Mode Theme"
								>
									<span class="icon-sun" aria-hidden="true" />
								</button>
							</div>
						{:else}
							<button
								on:click={toggleTheme}
								class="button is-only-icon is-text"
								aria-label="Replace to Light Mode Theme"
							>
								<span class="icon-moon" aria-hidden="true" />
							</button>
						{/if}
					</div>
				</li>
			</ul>
		</div>
	</header>
	<aside
		class="main-side"
		style:display={isMenuOpened === null ? undefined : isMenuOpened ? 'block' : 'none'}
	>
		<div class="side-nav">
			<div class="side-nav-main">
				<section class="drop-section">
					<ul class="drop-list">
						<li class="drop-list-item">
							<a class="drop-button u-cross-center navLink is-selected" id="nav-project" href="/">
								<span class="text">Project</span>
							</a>
						</li>
						<li class="drop-list-item">
							<a class="drop-button u-cross-center navLink" id="nav-database" href="/database">
								<span class="text">Database</span>
							</a>
						</li>
						<li class="drop-list-item">
							<a class="drop-button u-cross-center navLink" id="nav-user" href="/user">
								<span class="text">Users</span>
							</a>
						</li>
					</ul>
				</section>
			</div>
		</div>
	</aside>
	<slot />
</div>
