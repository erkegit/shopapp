import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import adminService from "../../services/admin.service"
import Skeleton from "@mui/material/Skeleton";

function ListProducts() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService
      .listProducts()
      .then((response) => response.data)
      .then((data) => {
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
      <h1 className="text-3xl text-center font-bold ">Products</h1>
      {error && <h1>{error.message}</h1>}
      <h1>Length of products: {products && products.length}</h1>
        <div className="flex flex-wrap items-start flex-1 justify-center h-full py-4 space-x-6 ">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {loading &&
            Array.from(new Array(10)).map((item, index) => (
              <div key={index}>
                <Skeleton variant="rectangular" width={250} height={180} />
                <Skeleton />
                <Skeleton width="60%" />
              </div>
            ))}
        </div>
    </div>
  );
}

export default ListProducts;
