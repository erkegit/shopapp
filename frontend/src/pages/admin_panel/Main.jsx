import React from "react";
import { Link } from "react-router-dom"

function Main() {
  return (
    <div className="flex-1 flex">
      <div className="flex w-full h-min justify-center m-4 space-x-4">
      <Link to="/admin/list" className="bg-black text-white p-6 rounded-xl  text-3xl font-bold">
          List products
        </Link>
        <Link to="/admin/add" className="bg-black text-white p-6 rounded-xl  text-3xl font-bold">
          Add a new product
        </Link>
        <Link to="/admin/edit" className="bg-black text-white p-6 rounded-xl text-3xl font-bold">
          Edit a product
        </Link>
        <Link to="/admin/delete" className="bg-black text-white p-6 rounded-xl text-3xl font-bold">
          Delete a product
        </Link>
      </div>
    </div>
  );
}

export default Main;
