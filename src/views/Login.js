import React, { useEffect, useState } from "react";
import "../styles/register.css";
import Input from '../components/Input'
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import BASE_URL from '../utils/baseUrl'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'

import axios from "axios";
const Login = () => {


    const initialUser = {
        username: "",
        password: "",

    };
    const history = useHistory()

    const [loginData, setLoginData] = useState(initialUser);
    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/auth/login`, loginData)
            .then(function (response) {

                if (response.data?.data?.token) {
                    sessionStorage.setItem('token', response.data?.data?.token)

                }
                toast.success("Successfully logged in")
                setTimeout(() => { history.push('/') }, 3000)

            }).catch((error) => {
                toast.error(error?.response?.data?.message)
            })


    };
    return (
        <Navbar
            showUser={false}
        >
            <div className="login-form-container">
                <div className="text-center font-bold app-color uppercase text-xl header-reg px-10">
                    login
                </div>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="schoolmanager-container w-full max-w-xs mx-auto">
                        <div className="grid grid-cols-6 grid-rows-2  gap-8">
                            <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                                <Input
                                    name="username"
                                    inputHandler={inputHandler}
                                    type="text"
                                    labelName="Username"
                                    placeholder="Username"
                                    className="login-input"
                                    required
                                />
                            </div>
                            <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                                <Input
                                    name="password"
                                    inputHandler={inputHandler}
                                    type="password"
                                    labelName="Password"
                                    placeholder="Password"
                                    className="login-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button className="app-background text-gray-800 font-bold  py-2 px-10 rounded inline-flex items-center">
                            <span className="text-white">Login</span>
                        </button>
                    </div>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={6000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                />
            </div>
        </Navbar>

    )
}

export default Login