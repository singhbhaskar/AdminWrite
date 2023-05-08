import { ProjDatabases } from '$lib/AppwriteService';
import type { PageLoad } from './$types';

export const load = (async ({ params, depends }) => {
	depends("documents");
	const databaseId = params.databaseId;
	const collectionId = params.collectionId;
	const documents = await ProjDatabases.listDocuments(databaseId, collectionId);
	const attributes = await ProjDatabases.listAttributes(databaseId, collectionId);

	return {
		databaseId: databaseId,
		collectionId: collectionId,
		documents: documents.documents,
		attributes: attributes.attributes
	};
}) satisfies PageLoad;