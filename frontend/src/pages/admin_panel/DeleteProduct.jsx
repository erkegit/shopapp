import React, { useEffect, useState } from "react";
import adminService from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

function DeleteProduct() {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    adminService
      .listProducts()
      .then((res) => res.data)
      .then((products) => setProducts(products));
  }, []);

  function deleteProduct(e) {
    e.preventDefault();
    adminService
      .deleteProduct(product)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          alert("Product deleted successfully");
          navigate("/admin");
        }
      });
  }

  return (
    <div className="flex justify-center flex-1">
      <div className="flex flex-col space-y-3">
         <select
          name=""
          id=""
          onChange={(e) =>
            setProduct(products.find((p) => p.id == e.target.value))
          }
        >
          <option value="" disabled selected>
            Select the product
          </option>
          {products &&
            products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
        </select>
        {product && <button className="bg-black text-white rounded py-2 px-4 text-lg" onClick={deleteProduct}>Delete this product</button>}
      </div>
     
    </div>
  );
}

export default DeleteProduct;