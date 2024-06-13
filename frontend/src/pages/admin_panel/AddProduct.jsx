import React, { useEffect, useState } from "react";
import adminService from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [images, setImages] = useState([""]);
  const [product, setProduct] = useState({images: []})
  const navigate = useNavigate();

  useEffect(()=> {
    setProduct({...product, images: images})
  }, [images])

  function addProduct(e) {
    e.preventDefault()
    adminService
    .addProduct(product)
    .then(res => res.status)
    .then(status => {
      if (status == 200) {
        alert("Product added successfully")
        navigate("/admin")
      }
    })
  }

  return (
    <div className="flex justify-center flex-1">
      <div className="flex items-center flex-col space-y-3">
        <h1 className="text-2xl font-bold ">Add a new product</h1>
        <form className="flex flex-col space-y-3 border border-black p-3  " onSubmit={addProduct}>
          <div>
            <label htmlFor="">Product title </label>
            <input type="text" name="" id="" required placeholder="title" onChange={(e) => setProduct({...product, title: e.target.value})} />
          </div>

          <div className="flex items-start flex-col space-y-2">
            <label htmlFor="">Product description </label>
            <textarea
              name=""
              id=""
              required
              placeholder="description"
              className="w-full"
              onChange={(e) => setProduct({...product, description: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label htmlFor="">Product price </label>
            <input
              type="number"
              min={1}
              name=""
              id=""
              required
              placeholder="price"
              onChange={(e) => setProduct({...product, price: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Product price </label>
            <input
              type="text"
              name=""
              id=""
              required
              placeholder="category"
              onChange={(e) => setProduct({...product, category: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Product thumbnail </label>
            <input
              type="url"
              name=""
              id=""
              required
              placeholder="thumbnail image url"
              onChange={(e) => setProduct({...product, thumbnail: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Product brand </label>
            <input
              type="text"
              name=""
              id=""
              required
              placeholder="brand"
              onChange={(e) => setProduct({...product, brand: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Product images</label>

            <div className="flex flex-col space-y-2">
              {images.map((image, index) => (
                <input type="url" placeholder="image url" onChange={(e) => setImages((images) => {
                    const newImages = images.slice(0);
                    newImages[index] = e.target.value;
                    return newImages;
                })} />
              ))}

              <button className="text-white bg-black rounded p-2 self-center" onClick={() => setImages([...images, ""])}>
                Add more images
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="">Stock number </label>
            <input
              type="number"
              min={1}
              name=""
              id=""
              required
              placeholder="stock number"
              onChange={(e) => setProduct({...product, stock: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Discount percentage </label>
            <input
              type="number"
              min={0}
              name=""
              id=""
              required
              placeholder="discount percentage"
              onChange={(e) => setProduct({...product, discountPercentage: e.target.value})}
            />
          </div>

          <button type="submit" className="bg-black text-white p-3 rounded self-center">Add product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

// "id": 1,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": "549.00",
//     "category": "smartphones",
//     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "brand": "Apple",
//     "images": [
//       "https://cdn.dummyjson.com/product-images/1/1.jpg",
//       "https://cdn.dummyjson.com/product-images/1/2.jpg",
//       "https://cdn.dummyjson.com/product-images/1/3.jpg",
//       "https://cdn.dummyjson.com/product-images/1/4.jpg",
//       "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ],
//     "stock": 94,
//     "rating": "4.69",
//     "discount_percentage": "12.96",
//     "inCart": false
