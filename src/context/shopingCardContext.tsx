import {createContext, useContext, ReactNode, useState} from "react";
import {ShoppingCart} from '../components/ShoppingCart'
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCardProviderContext = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCardContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseItemQuantity: (id: number) => void,
    decreaseItemQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}



const shoppingCartContext = createContext({} as ShoppingCardContext)

export const UseShoppingCart = () => {
    return useContext(shoppingCartContext)
}

export const ShoppingCartProvider = ({children}: ShoppingCardProviderContext) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseItemQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            } else{
                return  currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    const decreaseItemQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else{
                return  currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems =>{
            return currItems.filter(item => item.id !== id)
        })
    }

    return <shoppingCartContext.Provider value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
    }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </shoppingCartContext.Provider>
}

