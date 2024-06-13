import React, { useEffect, useState, useContext, useRef } from "react";
//import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/cart";
import UserContext from "../context/user";
import userService from "../services/user.service";
import { Link } from "react-router-dom";

function Header() {
  const { cart } = useContext(CartContext);
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [authHover, setAuthHover] = useState(false);

  function handleAuth() {
    if (!user) {
      navigate("/login");
    }
  }

  function logout() {
    userService
    .logout()
    .then(res => res.status)
    .then(status => {
      if (status == 200) {
        updateUser()
        navigate("/")
        window.location.reload()
      }
    })
    .catch(err => alert(err.message))
  }

  return (
    <header className="flex justify-between item-center bg-red-700 text-white py-4 px-6 h-max">
      <p className="text-2xl font-bold cursor-pointer " onClick={() => navigate("/")}>BereckeShop</p>
      <div className="flex space-x-3 items-center">
      <Link to="/products">Начать Покупку</Link>
        {user && (
          <div
            className="flex gap-2 cursor-pointer p-1 "
            onClick={() => navigate("/cart")}
          >
            <FavoriteIcon style={{width:"30px", height:"30px"}}/>
            <p className="px-2 py-1 text-black rounded absolute">
              {cart && cart.length}
            </p>
          </div>
        )}

        <div  
          onMouseOver={() => setAuthHover(true)}
          onMouseOut={() => setAuthHover(false)}
          className="flex flex-col items-end w-auto"
        >
          <div className="cursor-pointer flex gap-2" onClick={handleAuth}>
            {/* <PersonIcon/> */}
            {user && user.userimg ?  <img src={user && user.userimg} alt=""/> : <PersonIcon/>}
            <p>{user && user.username}</p>
          </div>
          <div className="">
            {user && authHover && (
            <div
              className={`flex flex-col w-max absolute right-0`}
            >
              <div className="px-3 py-2 bg-red-500 text-white hover:bg-neutral-800" onClick={() => navigate("/purchases")}>My purchases</div>
              <div className="px-3 py-2 bg-red-500 text-white  hover:bg-neutral-800" onClick={logout}>Log out</div>
            </div>
          )}
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
