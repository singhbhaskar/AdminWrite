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
    {#if data.documents.length > 0}
    <div class="table-with-scroll">
      <div class="table-wrapper">
        <table class="table is-sticky-scroll">
          <thead class="table-thead">
            <tr class="table-row">
              <th class="table-thead-col" style="--p-col-width:230">
                <span class="eyebrow-heading-3">Document ID</span>
              </th>
              {#each data.attributes as attribute}
              <th class="table-thead-col" style="--p-col-width:185">
                <span class="eyebrow-heading-3">{attribute.key}</span>
              </th>
              {/each}
            </tr>
          </thead>
          <tbody class="table-tbody">
            {#each data.documents as document}
              <tr class="table-row">
                <td class="table-col" data-title="Document ID">
                  <button class="tag">
                    <span class="icon-duplicate" aria-hidden="true"></span>
                    <span class="text">{document.$id}</span>
                  </button>
                </td>
                {#each data.attributes as attribute}
                    <td class="table-col" data-title="{attribute.key}">
                      <span class="text">{document[attribute.key]}</span>
                    </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>    
		
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
        <h4 class="alert-sticky-title">No Documents Found</h4>
        <p>Create a new Documents in appwrite console and reload this page.</p>
      </div>
    </section>

    {/if}

	</div>
</main>
