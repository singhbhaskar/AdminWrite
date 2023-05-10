import { ProjDatabases } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'node-appwrite';

export const load = (async ({ params, depends }) => {
	depends("all-documents");
	const databaseId = params.databaseId;
	const collectionId = params.collectionId;
	const documents = await ProjDatabases.listDocuments(databaseId, collectionId, [
		Query.limit(100)
    ]);
	const attributes = await ProjDatabases.listAttributes(databaseId, collectionId);

	return {
		totalDocuments: documents.total,
		databaseId: databaseId,
		collectionId: collectionId,
		documents: documents.documents,
		attributes: attributes.attributes
	};
}) satisfies PageLoad;