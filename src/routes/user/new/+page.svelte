<script lang="ts">
	import { browser } from '$app/environment';

  import { UserIngestion } from '$lib/UserIngestionService';

  let expectedCreateBulkUser = [
    '[',
    '\t{',
    '\t\t"$id": [Generated]',
    '\t\t"name": [User XXX]',
    '\t\t"email": [userxxx@xyz.com]',
    '\t\t"phone": ""',
    '\t}',
    ']'
  ];
  let isLoading = false;

	let modalMessage = '';
	let modalType = '';
	const dialog: any = browser ? document.getElementById('dialog') : null;

  async function createUsers(event: Event) {

    const dialog: any = browser ? document.getElementById('dialog') : null;
    isLoading = true;
		try {
      const formEl = event.target as HTMLFormElement
			const formData = new FormData(formEl);
      let bulkUserCount: number = 0;
      for (let field of formData) {
        const [key, strValue] = field;
        bulkUserCount = parseInt(strValue);
      }
      // const bulkData: BulkDataIngestionRequest = {
      //   collectionId: data.collectionId,
      //   databaseId: data.databaseId,
      //   bulkData: bulkJsonValue
      // };
      await UserIngestion.ingestUsers(bulkUserCount);

			modalType = 'success';
			modalMessage =
				'Successfully created all the users'
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
    
    <h3 class="heading-level-3">Generate new Users</h3>
    <section class="u-min-width-100-percent">
      <code class="code-panel-content grid-code">
        {#each expectedCreateBulkUser as expectedCreateUser}
          <div class="grid-code-line-number"></div>
          <pre>{expectedCreateUser}</pre>
        {/each}
      </code>
    </section>
    
    <form class="form u-width-full-line u-min-width-100-percent" on:submit|preventDefault={createUsers}>
      <ul class="form-list">
        <li class="form-item">
          <label class="documents eyebrow-heading-1">Number of Users to Generate</label>
          <div class="input-text-wrapper">
            <input type="number" name="bulkUserCount" class="input-text" placeholder="Enter number of users as Integer" />
          </div>
        </li>
      </ul>
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
                  location.href = `/user/`;
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