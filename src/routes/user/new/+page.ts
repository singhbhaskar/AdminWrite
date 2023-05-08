import { ProjDatabases } from '$lib/AppwriteService';
import type { PageLoad } from './$types';

export const load = (async ({ depends }) => {
	depends("newUsers");
}) satisfies PageLoad;