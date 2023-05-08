import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { ProjUsers } from '$lib/AppwriteService';

export const POST = (async ({ request }) => {
    const res = await request.json();
    res.forEach(async (user) => {
        const apiResponse = await ProjUsers.delete(user.userId);
    });
    return json({
        deleted: true
    });
}) satisfies RequestHandler;