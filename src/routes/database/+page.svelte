<script lang="ts">
	import { browser } from '$app/environment';

	import type { PageData } from './$types';
	// import { AppwriteService } from '$lib/AppwriteService';

	export let data: PageData;

	let isLoading = false;

	let modalMessage = '';
	let modalType = '';
	const dialog: any = browser ? document.getElementById('dialog') : null;
</script>

<main class="main-content">
	<div class="container">
    {#if data.databaseResponse.length > 0}
		<ul
  class="grid-box"
  style="--grid-gap:2rem; --grid-item-size:30rem; --grid-item-size-small-screens:16rem;"
>
{#each data.databaseResponse as database}
  <li>
    <div class="card">
      <div class="grid-item-1">
        <div class="grid-item-1-start-start">
          	<div class="eyebrow-heading-3">{database.databaseName}</div>
			<h2 class="heading-level-6 u-margin-block-start-8">{database.totalCollections}</h2>
        </div>
        <div class="grid-item-1-end-start">
          <div class="u-flex u-gap-16 u-flex-wrap">
            <div class="tag">
              <a class="text" href="/database/{database.id}">View Collection</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
{/each}
</ul>
{:else}
<section class="alert-sticky is-danger">
  <button
    class="button is-text is-only-icon"
    style="--button-size:1.5rem;"
    aria-label="close alert"
  >
  </button>
  <div class="alert-sticky-image"><span class="icon-info" aria-hidden="true"></span></div>
  <div class="alert-sticky-content">
    <h4 class="alert-sticky-title">No Databases Found</h4>
    <p>Create database in appwrite console and reload this page.</p>
  </div>
</section>

{/if}

	</div>
</main>
