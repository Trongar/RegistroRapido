import type { Models } from 'appwrite';
import type { Output } from 'valibot';

import { any, minLength, minValue, number, object, omit, optional, string, transform } from 'valibot';


export const productDocumentSchema = object({
    "name": string("El nombre no es valido", [

        minLength(1, "Porfavor ingresa un nombre")
    ]),
    "description": string("La descripción no es valida", [
        minLength(1, "Porfavor ingresa una descripción")
    ]),
    "price": transform(
        string("Debe ser un numero"),
        (input) => Number(input) * 100,
        number([
            minValue(0, "El producto no pude costar menos de 0.00")
        ])),
    "quantity": transform(
        string("Debe ser un numero"),
        (input) => Number(input),
        number([
            minValue(1, "Debes tener almenos 1 elemento en existencia"
            )])
    ),
    "image": optional(any()),
    "storeId": string(),
    "$id": string(),
});

export const productFormSchema = omit(productDocumentSchema, ["$id"])


export type Product = Output<typeof productDocumentSchema> & Models.Document