import { ProjUsers } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'node-appwrite';

export const load = (async ({ depends }) => {
	depends("users");
	const users = await ProjUsers.list( [
		Query.limit(100)
    ]);
	return {
		totalUser: users.total,
		users: users.users
	};
}) satisfies PageLoad;