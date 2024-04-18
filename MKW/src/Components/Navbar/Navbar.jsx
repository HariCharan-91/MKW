import React, { useContext, useRef, useState } from "react";
import logo from "../Assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/Shopcontext";
import bar_icon from "../Assets/bar";

export default function Navbar() {
  const [navitem, setnavitem] = useState("Shop");
  const { getTotalCartitems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdowntoggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  function handlenavitem(item) {
    setnavitem(item);
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Men.Kids.Women</p>
      </div>

      <ul className="nav-menu" ref={menuRef}>
        <li
          onClick={() => {
            handlenavitem("Shop");
          }}
        >
          <Link
            to="/"
            className={navitem === "Shop" ? "linkli linklis" : "linkli "}
          >
            Shop
          </Link>
        </li>
        <li
          onClick={() => {
            handlenavitem("Men");
          }}
        >
          <Link
            to="/men"
            className={navitem === "Men" ? "linkli linklis" : "linkli "}
          >
            Men
          </Link>
        </li>
        <li
          onClick={() => {
            handlenavitem("Women");
          }}
        >
          <Link
            to="/women"
            className={navitem === "Women" ? "linkli linklis" : "linkli "}
          >
            Women
          </Link>
        </li>
        <li
          onClick={() => {
            handlenavitem("Kids");
          }}
        >
          <Link
            to="/kids"
            className={navitem === "Kids" ? "linkli linklis" : "linkli "}
          >
            Kids
          </Link>
        </li>
        <li
          onClick={() => {
            handlenavitem("Login");
          }}
        >
          <Link
            to="/login"
            className={
              navitem === "Login"
                ? "linkli linklis loginvisib"
                : "linkli loginvisib"
            }
          >
            Login
          </Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace('/')
            }}
            className="button"
          >Logout
          </button>
        ) : (
          <Link to="/login" className="linkli ">
            <button className="button">Login</button>
          </Link>
        )}

        <Link to="/cart" className="linkli">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="shopping-cart-alt"
            width={30}
            height={30}
            className="shopping_cart"
          >
            <path
              fill="#000000"
              d="M21.5,15a3,3,0,0,0-1.9-2.78l1.87-7a1,1,0,0,0-.18-.87A1,1,0,0,0,20.5,4H6.8L6.47,2.74A1,1,0,0,0,5.5,2h-2V4H4.73l2.48,9.26a1,1,0,0,0,1,.74H18.5a1,1,0,0,1,0,2H5.5a1,1,0,0,0,0,2H6.68a3,3,0,1,0,5.64,0h2.36a3,3,0,1,0,5.82,1,2.94,2.94,0,0,0-.4-1.47A3,3,0,0,0,21.5,15Zm-3.91-3H9L7.34,6H19.2ZM9.5,20a1,1,0,1,1,1-1A1,1,0,0,1,9.5,20Zm8,0a1,1,0,1,1,1-1A1,1,0,0,1,17.5,20Z"
            ></path>
          </svg>
        </Link>
        <div className="nav-cart-count">{getTotalCartitems()}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="bars"
          className="nav-dropdown "
          onClick={dropdowntoggle}
        >
          <path
            fill="#000000"
            d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
