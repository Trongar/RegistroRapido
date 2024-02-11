import type { APIRoute } from "astro";

import { AppwriteService } from "@lib/appwrite";


export const DELETE: APIRoute = async ({ request }) => {

    const data = await request.formData();
    const id = data.get("id") as string;



    const store = await AppwriteService.deleteDocument(
        import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
        import.meta.env.PUBLIC_APPWRITE_COLLECTION_STORE,
        id,
    );
    const team = await AppwriteService.deleteTeam(id);



    return new Response(JSON.stringify({
        team,
        store
    }));

}

