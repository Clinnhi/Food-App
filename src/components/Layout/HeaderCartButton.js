import { useContext, useEffect, useState, timer } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

  const {items} = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

 
  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0){
      return;
    }
    setBtnIsHighLighted(true);

    setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [cartCtx]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
