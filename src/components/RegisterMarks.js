import React, { useEffect, useState } from "react";
import "../styles/register.css";
import Input from '../components/Input'
import Select from 'react-select'
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from '../utils/baseUrl'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { getAllStudents } from '../services/students'
const RegisterMarks = ({ showFormView }) => {

    const initialMarksObject = {
        student: "",
        mathMarks: "",
        englishMarks: "",
        socialMarks: "",
        frenchMarks: "",
        kinyarwandaMarks: "",
        totalMarks: "",
        averageMarks: "",
        percentage: "",

    };


    const [marksData, setmarksData] = useState(initialMarksObject);
    const [studentsOptions, setStudentsOptions] = useState([])

    const loadData = async () => {
        return await getAllStudents()
    }
    React.useEffect(async () => {
        setStudentsOptions(await loadData())
    }
        , [])

    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setmarksData({ ...marksData, [name]: value });
    };
    const selectHandler = (payload) => {
        var name = payload.name;
        var value = payload.value;
        setmarksData({ ...marksData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/marks`)

    };

    return (
        <div className="login-form-container">
            <div className="text-center font-bold app-color uppercase text-xl header-reg px-10">
                Add Marks Info
            </div>

            <form onSubmit={handleSubmit} noValidate>

                <div className="schoolmanager-container w-full max-w-xs mx-auto">
                    <div className="grid grid-cols-6 grid-rows-2  gap-8">
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Select
                                options={studentsOptions}
                                onChange={(payload) => selectHandler({ ...payload, name: "student" })}
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="physicsMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Physics Marks"
                                placeholder="Physics Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="mathMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Math Marks"
                                placeholder="Math Marks"
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="englishMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="English Marks"
                                placeholder="English Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="socialMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Social Marks"
                                placeholder="Social Marks"
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="frenchMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="French Marks"
                                placeholder="French Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="kinyarwandaMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Kinyarwanda Marks"
                                placeholder="Kinyarwanda Marks"
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="totalMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Total Marks"
                                placeholder="Total
                                 Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="averageMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Average Marks"
                                placeholder="Average Marks"
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1">
                            <Input
                                name="percentage"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Percentage"
                                placeholder="Percentage"
                                className="login-input"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button className="app-background text-gray-800 font-bold  py-2 px-10 rounded inline-flex items-center">
                        <span className="text-white">Register Marks</span>
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

export default RegisterMarks