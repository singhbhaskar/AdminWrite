<script lang="ts">
	import { browser } from '$app/environment';

	import type { PageData } from './$types';

	export let data: PageData;

	let isLoading = false;

	let modalMessage = '';
	let modalType = '';
	const dialog: any = browser ? document.getElementById('dialog') : null;
</script>

<main class="main-content">
	<div class="container">
		<ul
  class="grid-box"
  style="--grid-gap:2rem; --grid-item-size:30rem; --grid-item-size-small-screens:16rem;"
>
  <li>
    <div class="card">
      <div class="grid-item-1">
        <div class="grid-item-1-start-start">
          	<div class="eyebrow-heading-3">Databases</div>
			<h2 class="heading-level-6 u-margin-block-start-8">{data.databases.total}</h2>
        </div>
        <div class="grid-item-1-end-start">
          <div class="u-flex u-gap-16 u-flex-wrap">
            <div class="tag">
              <a class="text" href="/database">Go to Datbase</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>

  <li>
    <div class="card">
      <div class="grid-item-1">
        <div class="grid-item-1-start-start">
          	<div class="eyebrow-heading-3">Users</div>
			<h2 class="heading-level-6 u-margin-block-start-8">{data.users.total}</h2>
        </div>
        <div class="grid-item-1-end-start">
          <div class="u-flex u-gap-16 u-flex-wrap">
            <div class="tag">
              <a class="text" href="/user">Go to Users</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>

</ul>

	</div>
</main>
