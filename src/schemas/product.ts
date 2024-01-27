import type { Models } from 'appwrite';
import type { Output } from 'valibot'

import { object, string, number, transform, minValue, optional, omit, minLength } from 'valibot';
import * as z from 'valibot';


export const productDocumentSchema = object({
    "name": string("El nombre no es valido",[

        minLength(1, "Porfavor ingresa un nombre")
    ]), 
    "description": optional(string()),
    "price": transform(
        string("Debe ser un numero"), 
        (input) => parseFloat(input), 
        number([
            minValue(0.00, "El producto no pude costar menos de 0.00")
        ])), 
    "quantity": transform(
        string("Debe ser un numero"),
        (input) => Number(input),
        number([
            minValue(1, "Debes tener almenos 1 elemento en existencia"
        )])
    ), 
    "image": optional(string()), 
    "storeId": string(), 
    "$id": string(), 
});

export const productFormSchema = omit(productDocumentSchema, ["$id", "storeId"])


export type Product = Output<typeof productDocumentSchema> & Models.Document