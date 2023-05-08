import type { BulkDataIngestionRequest } from '$lib/ProjectTypes';
import { ProjDatabases } from '$lib/AppwriteService';

export const DocumentIngestion = {
    ingestDocument: async(request: BulkDataIngestionRequest) => {
        request.bulkData.forEach(async (document) => {
            console.log(document);
            const id = Date.now();
            await ProjDatabases.createDocument(request.databaseId, request.collectionId, id.toString(), document);
        });
    }
};