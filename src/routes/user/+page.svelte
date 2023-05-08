<script lang="ts">
	import { browser } from '$app/environment';

	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	// import { AppwriteService } from '$lib/AppwriteService';

	export let data: PageData;

	let isLoading = false;

	let modalMessage = '';
	let modalType = '';
	const dialog: any = browser ? document.getElementById('dialog') : null;

  async function deleteSelectedUsers() {
		const selectedUsers = document.body.getElementsByClassName("user-check");
    let usersToDelete = [];
     for (let index = 0; index < selectedUsers.length; index++) {
      const element = selectedUsers[index];
      if(element.checked) {
        usersToDelete.push({
          userId: element.id
        });
      }
    }
    await deleteUsers(usersToDelete);
	}

  async function deleteAllUsers() {
		const selectedUsers = document.body.getElementsByClassName("user-check");
    let usersToDelete = [];
     for (let index = 0; index < selectedUsers.length; index++) {
      const element = selectedUsers[index];
      usersToDelete.push({
        userId: element.id
      });
    }
    await deleteUsers(usersToDelete);
	}

  async function deleteUsers(usersToDelete: any[]) {
    const dialog: any = browser ? document.getElementById('dialog') : null;
    isLoading = true;
		try {
			const res = await fetch(`/user/delete`, {
				method: 'POST',
				body: JSON.stringify(usersToDelete)
			});
      if (res.status != 200) {
        throw new Error("Problem occurred deleting the users");
      }
			modalType = 'success';
			modalMessage =
				'All users Deleted Successfully.';
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
        <span class="text" on:click={deleteSelectedUsers}>Delete Users</span>
      </button>
      <button class="button is-big u-margin-inline-start-16">
        <span class="icon-trash" aria-hidden="true"></span>
        <span class="text" on:click={deleteAllUsers}>Delete All Users</span>
      </button>
      <button class="button is-big u-margin-inline-start-16">
        <span class="icon-trash" aria-hidden="true"></span>
        <span class="text" on:click={() => 
        location.href = `/users/new`}>
          Bulk Create Users</span>
      </button>
  </div>
	<div class="container">
    {#if data.users.length > 0}
    <div class="table-with-scroll">
      <div class="table-wrapper">
        <table class="table is-sticky-scroll">
          <thead class="table-thead">
            <tr class="table-row">
              <th class="table-thead-col" style="--p-col-width:30">
                <span class="eyebrow-heading-3">Checkbox</span>
              </th>
              <th class="table-thead-col" style="--p-col-width:180">
                <span class="eyebrow-heading-3">User ID</span>
              </th>
              <th class="table-thead-col" style="--p-col-width:180">
                <span class="eyebrow-heading-3">Name</span>
              </th>
              <th class="table-thead-col" style="--p-col-width:180">
                <span class="eyebrow-heading-3">Email</span>
              </th>
              <th class="table-thead-col" style="--p-col-width:180">
                <span class="eyebrow-heading-3">Phone</span>
              </th>
              <th class="table-thead-col" style="--p-col-width:180">
                <span class="eyebrow-heading-3">Verification Status</span>
              </th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            {#each data.users as user}
              <tr class="table-row">
                <td class="table-col" data-title="User-checkbox">
                  <input class="user-check" id="{user.$id}" type="checkbox" />
                </td>
                <td class="table-col" data-title="userId">
                  <span class="text">{user.$id}</span>
                </td>
                <td class="table-col" data-title="name">
                    <span class="text">{user.name}</span>
                </td>
                <td class="table-col" data-title="email">
                    <span class="text">{user.email}</span>
                </td>
                <td class="table-col" data-title="phone">
                    <span class="text">{user.phone != ''? user.phone: 'N/A'}</span>
                </td>
                <td class="table-col" data-title="verified">
                    <span class="text">{user.status}</span>
                </td>
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
        <h4 class="alert-sticky-title">No Users Found</h4>
        <p>Create a new Users in appwrite console and reload this page.</p>
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
                invalidate("users");
                dialog.close();
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