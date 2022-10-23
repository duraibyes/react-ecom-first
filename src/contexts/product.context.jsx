import { createContext, useState } from 'react';
import productData from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
});

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(productData);
    const value = {products};
   
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
};