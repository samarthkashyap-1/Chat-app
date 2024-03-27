import React, { useEffect } from "react";
import { TextField } from "@mui/material";

import { registerUser } from "../Apis/api";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const user = await registerUser({ name, username, email, password });

      alert("User registered successfully");
      //clear the form
      e.target.name.value = "";
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col m-auto w-96 gap-5 ">
        <h1 className="text-5xl font-bold text-center ">Register</h1>
        <TextField
          className="text-black"
          id="standard-basic"
          label="Name"
          name="name"
          variant="standard"
        />
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
          label="Email"
          name="email"
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
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
