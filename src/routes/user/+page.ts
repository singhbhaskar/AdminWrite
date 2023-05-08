import { ProjUsers } from '$lib/AppwriteService';
import type { PageLoad } from './$types';

export const load = (async ({ depends }) => {
	depends("users");
	const users = await ProjUsers.list();
	console.log("Users are", users);
	return {
		users: users.users
	};
}) satisfies PageLoad;