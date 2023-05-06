import { ProjDatabases, ProjUsers } from '$lib/AppwriteService';
import type { PageServerLoad } from './$types';

export const load = (async ({ context }) => {

	let databases;
    let databaseResponse = [];
	try {
		databases = await ProjDatabases.list();
        await databases.databases.forEach(async (database) => {
            let id = database.$id;
            const collections = await ProjDatabases.listCollections(id);
            databaseResponse.push({
                id: id,
                databaseName: database.name,
                totalCollections: collections.total
            });
        });
    return {
		databaseResponse
	};
	} catch (err) {
		databases = null;
	}
}) satisfies PageServerLoad;