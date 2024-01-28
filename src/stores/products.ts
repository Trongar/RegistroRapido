import type { Models } from "appwrite";
import {atom} from "nanostores"


export const products = atom< Models.Document[]>([])


export const addProduct = (productItem: Models.Document) => {
    products.set([...products.get(), productItem])
}
export const setProducts = (productsArr: Models.Document[]) => {
    products.set(productsArr)
}