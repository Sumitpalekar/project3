import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import Button from "./Button";
import CartItem from "./CartItem";
import "../resources/cart-dropdown.styles.scss";
const CartDropdown = () => {
  const {cartItems, setIsCartOpen} = useContext(CartContext);
  const navigate = useNavigate();
  const Checkouthandler = () =>{
        navigate('/checkout');
        setIsCartOpen(false);
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
         {cartItems.map((cartItem)=> <CartItem cartItem={cartItem}/>)}
      </div>
      <Button onClick={Checkouthandler} >GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
