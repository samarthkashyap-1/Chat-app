import React, { useEffect } from "react";
import { TextField } from "@mui/material";

import { loginUser } from "../Apis/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;

    const password = e.target.password.value;

    try {
      const user = await loginUser({ username, password });

      alert("User Logged-In successfully");

      localStorage.setItem("user", JSON.stringify(user));

      //clear the form

      e.target.username.value = "";

      e.target.password.value = "";

      navigate("/chat");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col m-auto w-96 gap-5 ">
        <h1 className="text-5xl font-bold text-center ">Login</h1>

        <TextField
          className="text-black"
          id="standard-basic"
          label="Username"
          name="username"
          variant="standard"
        />

        <TextField
          className="text-black"
          id="standard-basic"
          label="Password"
          name="password"
          variant="standard"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
