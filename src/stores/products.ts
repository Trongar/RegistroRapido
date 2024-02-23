import type { Product } from "@schemas/product";
import { atom } from "nanostores";


export const products = atom<Product[]>([])
export const currentProduct = atom<string>()


