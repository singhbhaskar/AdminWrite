import { ProjDatabases, ProjUsers } from '$lib/AppwriteService';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

	let collections;
	let collectionResponse = [];
	try {
		collections = await ProjDatabases.listCollections(params.databaseId);
		await collections.collections.forEach(async (collection) => {
			let id = collection.$id;
			const documents = await ProjDatabases.listDocuments(params.databaseId, id);
            collectionResponse.push({
                id: id,
				databaseId: params.databaseId,
                collectionName: collection.name,
                totalDocuments: documents.total
            });
		})
		return {
			collections: collectionResponse
		};
	} catch (err) {
		databases = null;
	}
}) satisfies PageServerLoad;