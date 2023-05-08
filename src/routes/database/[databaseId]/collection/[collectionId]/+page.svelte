<script lang="ts">
	import { browser } from '$app/environment';

	import type { PageData } from './$types';
  import type { DatabaseCollection } from '$lib/ProjectTypes';
	import { invalidate } from '$app/navigation';
	// import { AppwriteService } from '$lib/AppwriteService';

	export let data: PageData;

	let isLoading = false;

	let modalMessage = '';
	let modalType = '';
	const dialog: any = browser ? document.getElementById('dialog') : null;

  async function deleteSelectedDocuments() {
		const selectedDocuments = document.body.getElementsByClassName("document-check");
    let documentsToDelete: DatabaseCollection[] = [];
     for (let index = 0; index < selectedDocuments.length; index++) {
      const element = selectedDocuments[index];
      if(element.checked) {
        documentsToDelete.push({
          documentId: element.id,
          databaseId: data.databaseId,
          collectionId: data.collectionId
        });
        element.checked = false;
      }
    }
    await deleteDocuments(documentsToDelete);
	}

  async function deleteAllDocuments() {
		const selectedDocuments = document.body.getElementsByClassName("document-check");
    let documentsToDelete: DatabaseCollection[] = [];
     for (let index = 0; index < selectedDocuments.length; index++) {
      const element = selectedDocuments[index];
      documentsToDelete.push({
        documentId: element.id,
        databaseId: data.databaseId,
        collectionId: data.collectionId
      });
    }
    await deleteDocuments(documentsToDelete);
	}

  async function deleteDocuments(collections: DatabaseCollection[]) {
    const dialog: any = browser ? document.getElementById('dialog') : null;
    isLoading = true;
		try {
			const res = await fetch(`/database/${data.databaseId}/collection/delete`, {
				method: 'POST',
				body: JSON.stringify(collections)
			});
      if (res.status != 200) {
        throw new Error("Problem occurred deleting the collections");
      }
			modalType = 'success';
			modalMessage =
				'Successfully deleted selected documents';
			dialog.showModal();
		} catch (err: any) {
			modalType = 'error';
			modalMessage = err.message;
			dialog.showModal();
		} finally {
			isLoading = false;
		}
  }
</script>

<main class="main-content">
  <div class="u-flex u-min-width-100-percent box">
      <button class="button is-big u-margin-inline-start-16">
        <span class="icon-trash" aria-hidden="true"></span>
        <span class="text" on:click={deleteSelectedDocuments}>Delete Selected</span>
      </button>
      <button class="button is-big u-margin-inline-start-16">
        <span class="icon-trash" aria-hidden="true"></span>
        <span class="text" on:click={deleteAllDocuments}>Delete All Documents</span>
      </button>
      <!-- <a href="/"> -->
        <button class="button is-big u-margin-inline-start-16">
          <span class="icon-trash" aria-hidden="true"></span>
          <span class="text" on:click={() => 
          location.href = `/database/${data.databaseId}/collection/${data.collectionId}/new`}>
            Bulk Create Documents</span>
        </button>
      <!-- </a> -->
  </div>
	<div class="container">
    {#if data.documents.length > 0}
    <div class="table-with-scroll">
      <div class="table-wrapper">
        <table class="table is-sticky-scroll">
          <thead class="table-thead">
            <tr class="table-row">
              <th class="table-thead-col" style="--p-col-width:30">
                <span class="eyebrow-heading-3">Checkbox</span>
              </th>
              <th class="table-thead-col" style="--p-col-width:180">
                <span class="eyebrow-heading-3">Document ID</span>
              </th>
              {#each data.attributes as attribute}
              <th class="table-thead-col" style="--p-col-width:155">
                <span class="eyebrow-heading-3">{attribute.key}</span>
              </th>
              {/each}
            </tr>
          </thead>
          <tbody class="table-tbody">
            {#each data.documents as document}
              <tr class="table-row">
                <td class="table-col" data-title="Document ID">
                  <input class="document-check" id="{document.$id}" type="checkbox" />
                </td>
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

  <div>
    <dialog class="modal is-small" id="dialog">
      <form class="modal-form" method="dialog">
        <header class="modal-header u-flex u-gap-12 u-cross-center" style="flex-direction: row;">
          {#if modalType === 'error'}
            <div class="avatar is-color-orange is-medium">
              <span class="icon-exclamation" aria-hidden="true" />
            </div>
            <h4 class="modal-title heading-level-5">Error 🚨</h4>
          {:else}
            <div class="avatar is-color-green is-medium">
              <span class="icon-check" aria-hidden="true" />
            </div>
            <h4 class="modal-title heading-level-5">Success 🎉</h4>
          {/if}
        </header>
        <div class="modal-content u-small">{modalMessage}</div>
        <div class="modal-footer">
          <div class="u-flex u-main-end u-gap-16">
            <button
              on:click={() => {
                modalMessage = '';
                modalType = '';
                dialog.close();
                invalidate("documents");
              }}
              class="button is-secondary"
            >
              <span class="text">Close</span>
            </button>
          </div>
        </div>
      </form>
    </dialog>
  </div>
</main>