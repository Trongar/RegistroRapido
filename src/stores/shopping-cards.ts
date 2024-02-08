import { persistentAtom } from "@nanostores/persistent"
import type { Product } from "@schemas/product"


export const shoppingCart = persistentAtom<{ product: Product, quantity: number, storeId: string }[]>("cart", [], {
    encode: JSON.stringify,
    decode: JSON.parse
})

export const addToCart = (product: Product) => {

    if (getCartItemIndex(product.$id) !== -1) {
        return shoppingCart.set(updateCartItem(getCartItemIndex(product.$id), product))
    }
    shoppingCart.set([...shoppingCart.get(), {
        product,
        quantity: 1,
        storeId: product.storeId
    }])
}
export const quitCartItem = (index: number) =>
    shoppingCart.get().filter((_, itemIndex) => itemIndex !== index)

export const getCartItemIndex = (id: string) =>
    shoppingCart.get().findIndex(
        entry => entry.product.$id === id
    )
export const updateCartItem = (index: number, product: Product) => {
    const quantity = (shoppingCart.get()[index].quantity + 1) % (shoppingCart.get()[index].product.quantity + 1)
    if (quantity === 0) return quitCartItem(index)
    return shoppingCart.get().with(index, {
        product,
        quantity,
        storeId: product.storeId
    })
}
export const setInCartQuantity = (index: number, quantity: number) => {
    shoppingCart.set(shoppingCart.get().with(index, {
        product: shoppingCart.get()[index].product,
        quantity,
        storeId: shoppingCart.get()[index].product.storeId
    }))
}
export const getInCartItem = (id: string) =>
    shoppingCart.get().find(item => item.product.$id === id)