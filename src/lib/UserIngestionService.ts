import { ProjUsers } from '$lib/AppwriteService';

export const UserIngestion = {
    ingestUsers: async(request: number) => {
        const id: number = Date.now();
        const listOfNumbers: number[] = Array.from({length: request}, (_, index) => index + 1);
        listOfNumbers.forEach(async (num) => {
            const uniqueId = id + num;
            const userId: string = `user${uniqueId}`;
            await ProjUsers.create(userId, `${userId}@xyz.com`, undefined, undefined, `User ${uniqueId}`);
        });
    }
};