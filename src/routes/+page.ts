import { ProjDatabases, ProjUsers } from '$lib/AppwriteService';
import type { PageServerLoad } from './$types';

export const load = (async ({ context }) => {

	let databases;
	let users;
	try {
		databases = await ProjDatabases.list();
		users = await ProjUsers.list();
	} catch (err) {
		databases = null;
	}

	return {
		databases: databases,
		users: users
	};
}) satisfies PageServerLoad;