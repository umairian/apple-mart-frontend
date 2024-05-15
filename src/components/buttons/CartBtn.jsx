import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const CartBtn = () => {
  const itemCount = useSelector((state) => state.itemCounter.itemCount);

  return (
    <>
      <NavLink to="/cart" className="btn btn-outline-primary ms-2">
        <span className="fa fa-shopping-cart me-1"></span> Cart ({itemCount})
      </NavLink>
    </>
  );
};

export default CartBtn;
