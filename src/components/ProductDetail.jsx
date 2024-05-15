import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setItemCount } from "../redux/actions/index";
import { useEffect } from "react";
import { getSingleProduct } from "../services/Product";
import { showToast } from "../utils/showToast";
import {
  addToCart,
  getCartItemsCount,
  removeCartItem,
} from "../services/CartManagment";

const ProductDetail = () => {
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const { token, userId } = useSelector((store) => store.auth);
  const proid = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const productId = proid.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSingleProduct(productId);
        if (result.success) {
          setProduct(result.data.product);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);
  dispatch(addItem(product));

  const handleCart = async (product) => {
    if (cartBtn === "Add to Cart") {
      if (token === null) {
        showToast(
          "Please login first to your Apple Mart account, if you are new here kindly create an account.",
          "error",
          true
        );
        return;
      } else {
        const add = await addToCart(token, userId, { productId: product.id });
        if (add.success) {
          showToast(add.data.message, "success", true);
          const result = await getCartItemsCount(token, userId);
          if (result.success) {
            dispatch(setItemCount(result.data.count));
          }
        } else {
          showToast(add.message, "error", true);
        }
        setCartBtn("Remove from Cart");
      }
    } else {
      if (token === null) {
        showToast(
          "Please login first to your Apple Mart account, if you are new here kindly create an account.",
          "error",
          true
        );
        return;
      } else {
        const removeFromCart = await removeCartItem(token, userId, {
          productId: product.id,
        });
        if (removeFromCart.success) {
          showToast(removeFromCart.data.message, "success", true);
          dispatch(setItemCount(removeFromCart.data.count));
        }
        setCartBtn("Add to Cart");
      }
    }
  };

  return (
    <>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto product">
            <img src={product?.imgUrl} alt={product?.title} height="400px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">{product?.title}</h1>
            <hr />
            <h2 className="my-4">${product?.price}</h2>
            <p className="lead">{product?.description}</p>
            <button
              onClick={() => handleCart(product)}
              className="btn btn-outline-primary my-5"
            >
              {cartBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
