import type { APIRoute } from "astro";

import { AppwriteService } from "@lib/appwrite";


export const POST: APIRoute = async ({ request }) => {

    const data = await request.formData();
    const id = AppwriteService.createID();
    const name = data.get("name") as string;
    const description = data.get("description") as string;



    const team = await AppwriteService.createTeam(id, name);
    const store = await AppwriteService.createDocument(
        import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
        import.meta.env.PUBLIC_APPWRITE_COLLECTION_STORE,
        team.$id,
        {
            name,
            description,
        }
    );



    return new Response(JSON.stringify({
        team,
        store
    }));

}

