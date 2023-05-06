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
    {#if data.collections.length > 0}
		<ul
  class="grid-box"
  style="--grid-gap:2rem; --grid-item-size:30rem; --grid-item-size-small-screens:16rem;"
>
  {#each data.collections as collection}
    <li>
      <div class="card">
        <div class="grid-item-1">
          <div class="grid-item-1-start-start">
              <div class="eyebrow-heading-3">{collection.collectionName}</div>
        <h2 class="heading-level-6 u-margin-block-start-8">{collection.totalDocuments}</h2>
          </div>
          <div class="grid-item-1-end-start">
            <div class="u-flex u-gap-16 u-flex-wrap">
              <div class="tag">
                <a class="text" href="/database/{collection.databaseId}/collection/{collection.id}">View Documents</a>
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
    <h4 class="alert-sticky-title">No Collections Found</h4>
    <p>Create a Collection in appwrite console and reload this page.</p>
  </div>
</section>

{/if}

	</div>
</main>
