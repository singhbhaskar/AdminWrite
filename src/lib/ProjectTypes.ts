export type DatabaseCollection = {
    collectionId: string,
    databaseId: string,
    documentId: string
}

export type BulkDataIngestionRequest = {
    collectionId: string,
    databaseId: string,
    bulkData: any[]
}