import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { ProjDatabases } from '$lib/AppwriteService';

export const POST = (async ({ request }) => {
    const res = await request.json();
    res.forEach(async (collection) => {
        const apiResponse = await ProjDatabases.deleteDocument(collection.databaseId, collection.collectionId, collection.documentId);
    });
    return json({
        deleted: true
    });
}) satisfies RequestHandler;