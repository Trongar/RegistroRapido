import type { APIRoute } from "astro";

import { AppwriteService } from "@lib/appwrite";


export const POST: APIRoute = async ({ request }) => {

    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description")as string;
    const image = data.get("image") as string;
    const price = data.get("price");
    const quantity = data.get("quantity");
    const storeId = data.get("storeId")
    const id = AppwriteService.createID()
    
    const product = await AppwriteService.createDocument(
        import.meta.env.PUBLIC_APPWRITE_DATABASE_STORES,
        import.meta.env.PUBLIC_APPWRITE_COLLECTION_PRODUCT,
        id,
        {
            name,
            description,
            image,
            price,
            quantity,
            storeId
        }
        );

    
    
    return new Response(JSON.stringify({
        product
    }));
    
}

