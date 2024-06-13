import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import cartService from "../services/cart.service";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useContext } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CartContext from "../context/cart";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ProductCard(props) {
  const [product, setProduct] = useState(props.product);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateCart} = useContext(CartContext);

  function addToCart() {
    setLoading(true);
    cartService
      .addToCart({ id: product.id })
      .then((res) => res.data)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        updateCart();
      })
      .catch((err) => {
        alert(err.response.data);
        setLoading(false);
      });
  }

  return (
    <div className="w-64 p-4 space-y-2 shadow-md rounded hover:scale-105">
      <div className="flex items-center w-full justify-between">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-max"
          centeredSlides
          style={{
            "--swiper-navigation-color": "gray",
            "--swiper-navigation-size": "25px",
          }}
        >
          {product.images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={image}
                alt={product.title}
                className="object-contain overflow-hidden h-32"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <ArrowBackIosIcon onClick={previous} className="cursor-pointer"/>
        <img src={product.images[index]} alt={product.title} className="object-contain overflow-hidden h-32" />
        <ArrowForwardIosIcon onClick={next} className="cursor-pointer"/> */}
      </div>
      <p
        className="font-semibold text-base cursor-pointer"
        onClick={() => {
          navigate("/products/" + product.id);
        }}
      >
        {product.title}
      </p>
      <p className="font-medium text-base">${product.price}</p>
      {product.inCart && (
        <button
          className={`text-white px-4 py-1 rounded-md bg-red-400 `}
          disabled
        >
          <FavoriteIcon/>
        </button>
      )}
      {!product.inCart && (
        <button
          className={`text-white px-4 py-1 rounded-md bg-red-500`}
          disabled={loading}
          onClick={addToCart}
        >
          {loading ? <img src="https://media.tenor.com/mT5Timqns1sAAAAj/loading-dots-bouncing-dots.gif" alt="" style={{width:"46px", height:"24px"}}/> : <FavoriteBorderIcon/>}
        </button>
      )}
    </div>
  );
}

export default ProductCard;
