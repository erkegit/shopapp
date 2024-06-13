import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function OrderCard({ order }) {
  return (
    <div className="w-full border-2 rounded py-3 px-6 flex flex-col space-y-2">
      <div className="text-xl font-semibold">
        Order № {order.id} - placed on {(new Date(order.order_date)).toLocaleString()}
      </div>

      <span className="text-xl font-semibold">Products purchased:</span>
      <div className="flex flex-col space-y-1 py-2">
      {order.products.map((product) => (
        <div className="w-full">
          <div className="flex w-full space-x-2 items-center">
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-[100px] rounded p-1"
              />
            </div>
            <div>
              <p className="text-lg font-bold">{product.title}</p>
              <p className="text-sm ">{product.brand}</p>
              <p className="font-semibold flex items-center">
                ${product.price}
                {"  "}
                <span className="text-gray-900  text-sm">
                  <CloseIcon style={{ width: "14px" }} />
                  {product.quantity}
                </span>
                = ${product.quantity * product.price}
              </p>
            </div>
          </div>
        </div>
      ))}
      </div>

      <div >
        <span className="text-xl font-semibold">Total price:</span> ${order.totalPrice} - <span className="text-green-600 ">
             Paid {order.payment_method}
        </span>
      </div>
      <div><span className="text-xl font-semibold">Delivery time:</span> {(new Date(order.delivery_time)).toLocaleString()} </div>
    </div>
  );
}

export default OrderCard;
