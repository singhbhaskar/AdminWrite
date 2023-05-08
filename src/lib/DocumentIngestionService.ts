import type { BulkDataIngestionRequest } from '$lib/ProjectTypes';
import { ProjDatabases } from '$lib/AppwriteService';

export const DocumentIngestion = {
    ingestDocument: async(request: BulkDataIngestionRequest) => {
        const id: number = Date.now();
        let localCounter = 1;
        request.bulkData.forEach(async (document) => {
            localCounter = localCounter + 1;
            const uniqueId = id + localCounter;
            await ProjDatabases.createDocument(request.databaseId, request.collectionId, uniqueId.toString(), document);
        });
    }
};