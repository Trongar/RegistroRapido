import type { APIRoute } from "astro";

import { AppwriteService } from "@lib/appwrite";


export const DELETE: APIRoute = async ({ request }) => {

    const data = await request.formData();
    const id = data.get("id") as string;



    const product = await AppwriteService.deleteProduct(id)


    return new Response(JSON.stringify({
        product
    }));

}

