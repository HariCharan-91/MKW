import React from "react";
import "./CSS/LoginSignup.css";
import { useState } from "react";

export default function LoginSignup() {
  const [state, setstate] = useState("Sign Up");
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const chageHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    console.log("signup", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={chageHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={chageHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={chageHandler}
          />
        </div>
        <button
          className="btn"
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span
              onClick={() => {
                setstate("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account
            <span
              onClick={() => {
                setstate("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}

        {state === "Sign Up" ? (
          <div className="login-signup-agree">
            <input type="checkbox" name="" id="checkboxid" />
            <p>By continuing , i agree to the terms of use & privacy policy</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
