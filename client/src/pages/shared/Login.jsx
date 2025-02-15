import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import {useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = ({ isOpen, onClose, onOpenSignUp }) => {
  
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const user = {
    
    login_api:"/user/login",
    profile_route:"/",
    signup_route:{onOpenSignUp},
  };
  
  console.log("user==",user);

  const onSubmit = async (data) => {
    console.log("dataaa",data)
    try {
        
        const response = await axiosInstance.request({ method: "POST", url: user.login_api, data });
        console.log("response===",response);

        toast.success("Log-in success");
        // navigate(user.profile_route);
        window.location.reload()
    } catch (error) {
        toast.error("Log-in failed");
        console.log(error);
    }
};

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Login</h2>
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit "
            className="w-full py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-500 "
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-orange-600 hover:underline focus:outline-none"
            onClick={() => {
              onClose(); // Close login panel
              onOpenSignUp(); // Open sign-up panel
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
