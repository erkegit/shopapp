import React, { useState } from "react";
import orderService from "../services/order.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/cart";

function Checkout() {
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);

  const localTime = () => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [orderDetails, setOrderDetails] = useState({
    paymentMethod: "online",
    deliveryTime: localTime(),
    address: "",
  });

  function checkout(e) {
    e.preventDefault();
    if (
      orderDetails.paymentMethod === "" ||
      orderDetails.deliveryTime === "" ||
      orderDetails.address === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    orderService
      .checkoutOrder(orderDetails)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          alert("Your order has been placed");
          updateCart();
          navigate("/purchases");
        }
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="w-full flex-1 flex justify-center py-8">
      <form
        className="flex flex-col space-y-4 w-[40%] h-[40%]"
        onSubmit={checkout}
      >
        <h1 className="text-3xl font-bold self-center">Checkout form</h1>
        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="text-sm font-light text-slate-600">
            Delivery address
          </label>
          <input
            type="text"
            placeholder="City, street, building number, apartment, post code"
            className="border p-2 rounded"
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="text-sm font-light text-slate-600">
            Delivery date and time
          </label>
          <input
            type="datetime-local"
            placeholder="Delivery time"
            className="border p-2 rounded"
            value={localTime()}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, deliveryTime: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="" className="text-sm font-light text-slate-600">
            Payment method
          </label>
          <select
            name=""
            id=""
            className="border p-2 rounded"
            onChange={(e) =>
              setOrderDetails({
                ...orderDetails,
                paymentMethod: e.target.value,
              })
            }
          >
            <option value="online">Online via credit card</option>
            <option value="cash">Cash upon delivery</option>
          </select>

          {
            <div className="flex flex-col space-x-2 border-2 p-3 border-yellow-600 rounded-lg">
            <h1>Online payment</h1>
              <input type="text" placeholder="Card number" />
              <input type="text" placeholder="Expiring date" />
              <input type="text" placeholder="Cardholder name" />
            </div>
          }
        </div>

        <button className="bg-black text-white px-8 py-3 rounded-lg w-max self-center">
          Confirm the order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
