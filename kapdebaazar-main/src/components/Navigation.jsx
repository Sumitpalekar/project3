import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "../resources/navigation.styles.scss";
import { ReactComponent as Crown } from "../assets/crown.svg";
import { UserContext } from "../contexts/usercontext";
import { signOutUser } from "../utils/firebase/firebase";
import { useNavigate } from "react-router-dom";
import CartIcon from "./cart-icon";
import CartDropdown from "./cart-dropdown";
import { CartContext } from "../contexts/CartContext";
function Navigation() {
  const navigate = useNavigate(true);
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  const signouthandler = async()=>{
      await signOutUser();
      navigate('/signin');
  }
  return (
    <Fragment>
      <div className="navigation">
        <div className="logo-container">
          <Link className="link" to="/"><Crown className="logo" style={{cursor:"pointer"}}/></Link>
        </div>
        <div className="links-container">
          <Link className="link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="link" onClick={signouthandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="link" to="/signin">
              SIGN IN
            </Link>
          )}
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
