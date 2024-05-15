import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemCount } from "../redux/actions/index";
import { NavLink } from "react-router-dom";
import { getCartItems, removeCartItem } from "../services/CartManagment";
import { showToast } from "../utils/showToast";

const Cart = () => {
  const { token, userId } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCartItems(token, userId);
        if (result.success) {
          setCartProducts(result.data.cartProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, userId]);

  const handleClose = async (item) => {
    const removeFromCart = await removeCartItem(token, userId, {
      productId: item.id,
    });
    if (removeFromCart.success) {
      const result = await getCartItems(token, userId);
      if (result.success) {
        setCartProducts(result.data.cartProducts);
      }
      showToast(removeFromCart.data.message, "success", true);
      dispatch(setItemCount(removeFromCart.data.count));
    }
  };

  const cartItems = (cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button
            onClick={() => handleClose(cartItem)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.imgUrl}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">${cartItem.price}</p>
              <p className="font">${cartItem.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {cartProducts.length === 0 && emptyCart()}
      {cartProducts.length !== 0 && cartProducts.map(cartItems)}
    </>
  );
};

export default Cart;
