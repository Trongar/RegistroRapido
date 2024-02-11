import { persistentAtom } from "@nanostores/persistent"
export const currentStoreAtom = persistentAtom<string>("store", "")
export const getCurrentStore = currentStoreAtom.get()
export const setCurrentStore = (storeId: string) => currentStoreAtom.set(storeId)
