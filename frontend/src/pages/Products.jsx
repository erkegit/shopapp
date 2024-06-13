import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../services/product.service";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import MenuIcon from '@mui/icons-material/Menu';


function Products() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false)
  const query = new URLSearchParams(window.location.search);
  const category = query.get("category");
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const navigate = useNavigate();

  async function getAllProducts() {
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
  }

  async function getCategories() {
    productService
    .getCategories()
    .then(res => res.data)
    .then(objects => objects.map(obj => obj.category))
    .then(data => setCategories(["all", ...data]))
    .catch(err => alert(err.message));
  }

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!category) {
      getAllProducts();
    } else {
      productService
        .getProductsByCategory(category)
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
    }
  }, [category]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSearchBrand(event.target.value);
  };

  

  const filteredProducts = products && products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  &
  product.price.toString().includes(searchTerm1)
  &
  product.brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  

  return (
    <div className="flex-1 py-8 px-10">
      <h1 className="text-3xl text-center font-bold ">Products</h1>
          
      {error && <h1>{error.message}</h1>}
      <div style={{display:"flex", gap:"30px", marginLeft:"420px", marginTop:"20px"}}>
        <input type="text" placeholder="Search for a with name"
        value={searchTerm}
        className=" border-red-400 border-2 outline-none"
        onChange={handleSearchChange}/>
        <input type="text" placeholder="Search for a with price"
        value={searchTerm1}
        className=" border-red-400 border-2 outline-none"
        onChange={handleSearchChange1}/>
        <input type="text" placeholder="Search for a with brand"
        value={searchBrand}
        className=" border-red-400 border-2 outline-none"
        onChange={handleBrandChange}/>
      </div>
        <p>{searchTerm ? "Results from" + " " +searchTerm : " "}</p>
        <p>{searchTerm1 ? "Results from" + " " +"$"+searchTerm1 : " "}</p>
        <p>{searchBrand ? "Results from" + " " +searchBrand : " "}</p>
        <button onMouseOver={(e) => setVisible(true)}
                onClick={(e) => setVisible(false)}
                className="px-3 py-2 bg-red-500 rounded text-white hover:bg-neutral-500"><MenuIcon className=" px-1"/>Kaтегори</button>
     {visible && (
      <div className=" mt-3">
      {
         categories && categories.map(category => (
          <div className=" block">
            <button className="text-white bg-red-800 rounded px-4 py-2 hover:bg-gray-700 ml-4 mt-2" onClick={() => navigate(category == "all" ? "/products" : "?category="+category)}>{category}</button>
          </div>
         ))
       }
      </div>
     )}
      <div className="flex flex-wrap items-start  justify-center h-full py-4 space-x-6">

      

        {
          searchTerm || searchTerm1 || searchBrand? 
        
          filteredProducts.map(product => (
            <div key={product.id}><ProductCard key = {product.id} product = {product}/></div>
          )) 
          
          :

          products &&
          products.map((product) => (
              <ProductCard key={product.id} product={product} />
          ))
        }
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

export default Products;
