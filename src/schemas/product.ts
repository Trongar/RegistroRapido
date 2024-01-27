import type { Models } from 'appwrite';
import type { Output } from 'valibot'

import { object, string, number, minValue, array, date } from 'valibot';


export const productDocumentSchema = object({
    "name": string(), 
    "description": string(), 
    "price": number([minValue(0)]), 
    "quantity": number([minValue(0)]), 
    "image": string(), 
    "storeId": string(), 
    "$id": string(), 
    "$collectionId": string(), 
    "$databaseId": string(), 
    "$createdAt": date(), 
    "$updatedAt": date(), 
    "$permissions": array(string()), 
    
});
export type Product = Output<typeof productDocumentSchema> & Models.Document