import type { Models } from "appwrite";
import {atom} from "nanostores"


const $products = atom< Models.Document[]>([])

export const products = $products;

export const addProduct = (product: Models.Document) => {
    $products.set([...$products.get(), product])
}
export const setProducts = (products: Models.Document[]) => {
    $products.set(products)
}