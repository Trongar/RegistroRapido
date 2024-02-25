import type { APIRoute } from "astro";

import { AppwriteService } from "@lib/appwrite";
import { productFormSchema } from "@schemas/product";
import { safeParse, type Output } from "valibot";


export const PATCH: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const id = data.get("$id") as string;
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const price = data.get("price") as string;
    const quantity = data.get("quantity") as string;
    const image = data.get("image") as string;
    const storeId = data.get("storeId") as string;

    const formObject = {
        name,
        description,
        price,
        quantity,
        image,
        storeId
    }

    const parsed = safeParse(productFormSchema, formObject)


    const product = AppwriteService.updateProduct(
        id,
        parsed.output as Output<typeof productFormSchema>
    )

    return new Response(JSON.stringify({
        product,
    }))
}