import { createContext, useEffect, useState } from "react";

const addCartItems = (cartItems, productToAdd ) => {
    //check product exits
    const checkItems = cartItems.find(
        (items) => items.id === productToAdd.id
    );

    //then update qty
    if( checkItems ) {
        return cartItems.map((item) => item.id === productToAdd.id ? {...item, quantity:item.quantity + 1} : item);
    }

    //else add new entry
    return [...cartItems, {...productToAdd, quantity:1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=>total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}