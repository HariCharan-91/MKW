import React, { createContext, useState } from "react"
import { useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultcart = () => {
    let cart = {};
    for (let index = 0; index < 300 ; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setall_products] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultcart())

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
            .then((res) => res.json())
            .then((data) => {
                setall_products(data);
            });

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body:"",
            }).then((res) => res.json()).then((data) => {
               setCartItems(data);
            })
        }

    }, [])




    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if (localStorage.getItem('auth-token')) {
            await fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((res) => res.json()).then((data) => {
                console.log(data);
            })
        }
    }
    
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            await fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((res) => res.json()).then((data) => {
                console.log(data);
            })
        }
    }

    const getTotaCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((Product) => Product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }


        }
        return totalAmount;
    }

    const getTotalCartitems = () => {
        let totalitem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalitem += cartItems[item]
            }
        }
        return totalitem;
    }
    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotaCartAmount, getTotalCartitems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;