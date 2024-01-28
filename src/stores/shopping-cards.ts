import type { Product } from "@schemas/product"
import { atom } from "nanostores"


export const shoppingCart = atom<{ product: Product, quantity: number }[]>([])

export const addToCart = (product: Product) => {

    if (getCartItemIndex(product.$id) !== -1) {
        return shoppingCart.set(updateCartItem(getCartItemIndex(product.$id), product))
    }
    shoppingCart.set([...shoppingCart.get(), {
        product,
        quantity: 1
    }])
}
export const getCartItemIndex = (productId: string) =>
    shoppingCart.get().findIndex(
        entry => entry.product.$id === productId
    )
export const updateCartItem = (index: number, product: Product) => {
    return shoppingCart.get().with(index, {
        product,
        quantity: shoppingCart.get()[index].quantity + 1

    })
}
export const setInCartQuantity = (index: number, quantity: number) => {
    shoppingCart.set(shoppingCart.get().with(index, {
        product: shoppingCart.get()[index].product,
        quantity
    }))
}
