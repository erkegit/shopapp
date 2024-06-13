import React, { useContext, useEffect, useState } from "react";
import cartService from "../services/cart.service";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CartProduct from "../components/CartProduct";
import CartContext from "../context/cart";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const total = cart
    ? cart.reduce((acc, p) => acc + p.price * p.quantity, 0)
    : 0;
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();


  function updateProduct(id, quantity) {
    cartService
      .updateCart(id, quantity)
      .then((res) => res.data)
      .then((data) => {
        setCart(data);
        updateCart();
      });
  }

  function removeProduct(id) {
    cartService
      .removeFromCart(id)
      .then((res) => res.data)
      .then((data) => {
        setCart(data);
        updateCart();
      });
  }

  useEffect(() => {
    setLoading(true);
    cartService
      .getCart()
      .then((res) => res.data)
      .then((data) => {
        setCart(data);
        setLoading(false);
      });
  }, []);

  return (
      <div className="flex-1 w-full h-full flex justify-center">
        <div className="w-[70%] py-5 flex space-x-4">
          <div className="w-[70%]">
            <div className="flex flex-col space-y-4">
              {loading && (
                <Stack
                  direction={"row"}
                  spacing={1}
                  className="w-full py-6 h-[600px] flex justify-center items-start"
                >
                  <Skeleton
                    variant="rounded"
                    height={200}
                    width={200}
                    className="w-[40%]"
                  />

                  <Stack spacing={1}>
                    <Skeleton variant="rounded" height={30} width={500} />
                    <Skeleton variant="rounded" width={200} height={30} />
                    <Skeleton variant="rounded" width={150} height={30} />
                  </Stack>

                  <Stack spacing={1}>
                    <Skeleton variant="rounded" width={200} height={40} />
                    <Skeleton variant="rounded" width={200} height={40} />
                    <Skeleton variant="rounded" width={200} height={40} />
                  </Stack>
                </Stack>
              )}
              {cart &&
                cart.map((cartProduct) => (
                  <CartProduct
                    product={cartProduct}
                    update={updateProduct}
                    remove={removeProduct}
                  />
                ))}
            </div>
          </div>
          {cart && (
            <div className="w-[30%] flex flex-col space-y-3">
              <h1 className="text-2xl font-bold">Your order</h1>
              <div className="flex space-x-2 text-xl font-bold w-full justify-between">
                <p className="">Total: </p>
                <p>${total}</p>
              </div>
              <div>
                <p>{cart.length} items</p>
              </div>
              <div className="text-sm text-slate-600 text-end ">
                <p>${total / 12} x 12 months</p>
                <p>${total / 6} x 6 months</p>
              </div>
              <button className="w-full mx-4 text-white bg-black rounded-lg  py-3" onClick={() => navigate("/checkout")}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
  );
}

export default Cart;
