import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/Product";
const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts();
        if (result.success) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const cardItem = (item) => {
    return (
      <div
        onClick={() => navigate(`/products/${item.id}`)}
        class="card my-5 py-4"
        key={item.id}
        style={{ width: "18rem" }}
      >
        <img src={item.imgUrl} class="card-img-top" alt={item.title} />
        <div class="card-body text-center">
          <h5 class="card-title">{item.title}</h5>
          <p className="lead">${item.price}</p>
          <NavLink to={`/products/${item.id}`} class="btn btn-outline-primary">
            Buy Now
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Product</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          {products?.map(cardItem)}
        </div>
      </div>
    </div>
  );
};

export default Product;
