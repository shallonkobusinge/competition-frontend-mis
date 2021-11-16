

import React, { useEffect, useState } from "react";
import "../styles/register.css";
import Input from '../components/Input'
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import BASE_URL from '../utils/baseUrl'
import 'react-toastify/dist/ReactToastify.css';
import authHeader from '../services/authHeader'

import axios from "axios";
const RegisterStudent = ({ showFormView }) => {
    const initialStudent = {
        studentID: "",
        firstName: "",
        lastName: "",
        class: "",

    };


    const [StudentData, setStudentData] = useState(initialStudent);
    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setStudentData({ ...StudentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/students`, StudentData, { headers: authHeader() })
            .then((response) => {
                console.log(response)
                showFormView("false")
                toast.success("Student Registered Successfully ")
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            })

    };

    return (
        <div className="login-form-container">
            <div className="text-center font-bold app-color uppercase text-xl header-reg px-10">
                Register Student
            </div>

            <form onSubmit={handleSubmit} noValidate>

                <div className="schoolmanager-container w-full max-w-xs mx-auto">
                    <div className="grid grid-cols-6 grid-rows-2  gap-8">
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="studentID"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Student Id"
                                placeholder="Student Id"
                                className="login-input"
                                required
                            />
                            <Input
                                name="firstName"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="First Name"
                                placeholder="First Name"
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="lastName"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Last Name"
                                placeholder="Last Name"
                                className="login-input"
                                required
                            />
                            <Input
                                name="class"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Class"
                                placeholder="Class"
                                className="login-input"
                                required
                            />
                        </div>


                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button className="app-background text-gray-800 font-bold  py-2 px-10 rounded inline-flex items-center">
                        <span className="text-white">Register Student</span>
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
    )
}

export default RegisterStudent