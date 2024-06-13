import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

function CartProduct({ product, update, remove }) {
  return (
    <div className="w-full border-t border-b py-2">
      <div className="w-full">
        <div className="flex w-full space-x-2 items-center">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-[100px]"
            />
          </div>
          <div>
            <p className="text-lg font-bold">{product.title}</p>
            <p className="text-sm ">{product.brand}</p>
            <p className="font-semibold flex items-center">
              ${product.price}{"  "}
              <span className="text-slate-600 text-sm">
                <CloseIcon style={{ width: "14px" }} />{product.quantity}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex text-sm  space-x-1 p-1 h-max">
            <button className="hover:border hover:border-slate-400 rounded px-1">
              {product.quantity == 1 ? (
                <DeleteIcon style={{ width: "18px" }} onClick={() => remove(product.id)} />
              ) : (
                <RemoveIcon style={{ width: "14px" }} onClick={() => update(product.id, product.quantity - 1)}/>
              )}
            </button>
            <p className="border border-slate-400 rounded px-2 ">
              {product.quantity}
            </p>
            <button className="hover:border hover:border-slate-400 rounded px-1">
              {<AddIcon style={{ width: "14px" }} onClick={() => update(product.id, product.quantity + 1)}/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
