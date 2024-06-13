import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../services/product.service";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function Home() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService
      .getProducts()
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 py-8 px-10">
      <h1 className="text-3xl text-center font-bold text-red-300">Home</h1>
      
    </div>
  );
}

export default Home;
