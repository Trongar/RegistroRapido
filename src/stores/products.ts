import type { Product } from "@schemas/product";
import { atom } from "nanostores";


export const products = atom<Product[]>([])


export const addProduct = (productItem: Product) => {
    products.set([...products.get(), productItem])
}
export const setProducts = (productsArr: Product[]) => {
    products.set(productsArr)
}