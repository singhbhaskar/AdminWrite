<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

  import type { BulkDataIngestionRequest } from '$lib/ProjectTypes';
  import { DocumentIngestion } from '$lib/DocumentIngestionService';

	export let data: PageData;

	let isLoading = false;

	let modalMessage = '';
	let modalType = '';

  let clipboardModalMessage = '';
  let clipboardMmodalType = '';

	const dialog: any = browser ? document.getElementById('dialog') : null;
  const clipboardModal: any = browser ? document.getElementById('clipboard-modal') : null;

  async function copyAttributeFormatToClipboard() {
    const clipBoard = navigator.clipboard;
    clipBoard.writeText(data.attributeFormat.join('\n')).then(() => {
      const clipboardModal: any = browser ? document.getElementById('clipboard-modal') : null;
      clipboardMmodalType = 'success';
			clipboardModalMessage ='Successfully Copied Collection Format';
        clipboardModal.showModal();
    });
  }

  async function createDocuments(documents: any) {

    const dialog: any = browser ? document.getElementById('dialog') : null;
    isLoading = true;
		try {
			const formData = new FormData(documents.target);
      let bulkJsonValue;
      for (let field of formData) {
        const [key, stringValue] = field;
        bulkJsonValue = JSON.parse(stringValue);
      }
      const bulkData: BulkDataIngestionRequest = {
        collectionId: data.collectionId,
        databaseId: data.databaseId,
        bulkData: bulkJsonValue
      };
      console.log(bulkData);
      await DocumentIngestion.ingestDocument(bulkData);

			modalType = 'success';
			modalMessage =
				'Successfully created Documents in Bulk'
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

	<div class="container">
    
    <h3 class="heading-level-3">File structure for Document should be following</h3>
    <section class="u-min-width-100-percent">
      <code class="code-panel-content grid-code">
        {#each data.attributeFormat as attributeFomat}
          <div class="grid-code-line-number"></div>
          <pre>{attributeFomat}</pre>
        {/each}
      </code>
    </section>

    <br>
    <button class="button is-secondary" aria-label="Add new item" on:click={copyAttributeFormatToClipboard}>
      <span class="icon-duplicate" aria-hidden="true"></span>
      <span class="text">Copy Document Format</span>
    </button>
    <br>
    
    <form class="form u-width-full-line u-min-width-100-percent" on:submit|preventDefault={createDocuments}>
      <ul class="form-list">
        <li class="form-item">
          <label class="documents eyebrow-heading-1">Documents</label>
          <textarea name="bulkData" class="input-text" placeholder="Type here..."></textarea>
        </li>
      </ul>
      <br>
      <button class="button" type="submit">
        <span class="icon-plus" aria-hidden="true"></span>
        <span class="text">Submit</span>
      </button>
    </form>
    

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
                  location.href = `/database/${data.databaseId}/collection/${data.collectionId}/`;
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

    <div>
      <dialog class="modal is-small" id="clipboard-modal">
        <form class="modal-form" method="dialog">
          <header class="modal-header u-flex u-gap-12 u-cross-center" style="flex-direction: row;">
            {#if clipboardMmodalType === 'error'}
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
          <div class="modal-content u-small">{clipboardModalMessage}</div>
          <div class="modal-footer">
            <div class="u-flex u-main-end u-gap-16">
              <button
                on:click={() => {
                  clipboardModalMessage = '';
                  clipboardMmodalType = '';
                  clipboardModal.close();
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