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
        (input) => {
            // Eliminar caracteres no numéricos y convertir la coma en punto decimal
            const cleanedString = input.replace(/[^0-9,.]/g, '').replace(',', '.');

            // Separar la parte entera y la parte decimal
            const partes = cleanedString.split('.');
            let parteEntera = partes[0];
            let parteDecimal = partes[1] || '';

            // Eliminar ceros a la izquierda en la parte entera
            parteEntera = parteEntera.replace(/^0+/, '');

            // Redondear la parte decimal a dos decimales
            parteDecimal = parteDecimal.slice(0, 2);

            // Unir parte entera y parte decimal
            const numeroFinalString = parteEntera + (parteDecimal.length > 0 ? + parteDecimal : '00');

            // Convertir a número y retornar
            return Number(numeroFinalString);
        },
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