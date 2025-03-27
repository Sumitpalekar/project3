import { createContext, useEffect, useState } from "react";
export const addCartItem = (cartItems, product) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === product.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === product.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...product, quantity: 1 }];
  };
export const removeCartItem = (cartItems,cartItem) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItem.id
  );
  if(existingCartItem.quantity === 1) {
     return cartItems.filter((item)=> item.id !== existingCartItem.id);
  }
  return cartItems.map((item) =>
    item.id === existingCartItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
}
export const clearCartItem = (cartItems,cartItem) => {
  return cartItems.filter((item)=> item.id !== cartItem.id);
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=> {},
    cartItems : [],
    addItemToCart: ()=> {},
    removeItemToCart: ()=> {},
    cartTotal : 0,
    setCartTotal: ()=> {},

});
export const CartProvider = ({children})=>{
    const  [isCartOpen, setIsCartOpen] = useState(false);
    const  [cartItems,setCartItems] = useState([]);
    const  [cartTotal,setCartTotal] = useState(0);

    const addItemToCart = (product)=> {
        setCartItems(addCartItem(cartItems,product));
    }
    const removeItemToCart = (cartItem) => {
         setCartItems(removeCartItem(cartItems,cartItem));
    }
    const clearItemFromCart = (cartItem) => {
      setCartItems(clearCartItem(cartItems,cartItem));
    }
    useEffect(() => {
       let total =0;
       for(let i=0;i<cartItems.length;i++){
         total += cartItems[i].quantity*cartItems[i].price
       }
       setCartTotal(total);
    }, [cartItems])
    
    const value= {isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemToCart, clearItemFromCart, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}