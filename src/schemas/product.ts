import { object, string, minLength, number, minValue, array, date, any } from 'valibot';

// export const storeFormSchema = object({
//     id: string([minLength(1, 'El id es requerido.'),]),
//     name: string([minLength(1, 'El nombre es requerido.'),]),
//     description: string([minLength(1, 'La descripción es requerida.'),]),
// });

export const productDocumentSchema = object({
    "name": string(), 
    "description": string(), 
    "price": number([minValue(0)]), 
    "cuantity": number([minValue(0)]), 
    "image": array(string()), 
    "storeId": string(), 
    "$id": string(), 
    "$createdAt": date(), 
    "$updatedAt": date(), 
    "$permissions": array(any()), 
    "$collectionId": string(), 
    "$databaseId": string(), 
});