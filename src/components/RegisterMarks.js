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
        totalMathMarks: "",
        englishMarks: "",
        totalEnglishMarks: "",
        socialMarks: "",
        totalSocialMarks: "",
        frenchMarks: "",
        totalFrenchMarks: "",
        kinyarwandaMarks: "",
        totalKinyarwandaMarks: "",
        totalMarks: "",
        totalFullMarks: "",
        averageMarks: "",
        percentage: "",

    };


    const [marksData, setmarksData] = useState(initialMarksObject);
    const [studentsOptions, setStudentsOptions] = useState([])
    const [isTotalMarksEmpty, setIstotalMakrsEmpty] = useState(false)
    const [isTotalFullMarksEmpty, setIstotalFullMakrsEmpty] = useState(false)

    const loadData = async () => {
        return await getAllStudents()
    }
    React.useEffect(async () => {
        console.log(await loadData())
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
        const marksDataTotals = (parseInt(marksData?.englishMarks) + parseInt(marksData?.frenchMarks) +
            parseInt(marksData?.kinyarwandaMarks) + parseInt(marksData?.socialMarks) + parseInt(marksData?.mathMarks))
        console.log(marksData)

        if (marksData?.englishMarks !== "" && marksData?.frenchMarks !== "" && marksData?.kinyarwandaMarks !== "" &&
            marksData?.mathMarks !== "" && marksData?.socialMarks !== "") {
            setmarksData({
                ...marksData, "totalMarks": marksDataTotals
            })
            setmarksData({
                ...marksData, "averageMarks": (marksDataTotals) / 5
            })
            setIstotalFullMakrsEmpty(true)
        }
        if (marksData?.totalEnglishMarks !== "" && marksData?.totalFrenchMarks !== "" && marksData?.totalKinyarwandaMarks !== ""
            && marksData?.totalMathMarks !== "" && marksData?.totalSocialMarks !== "") {
            setmarksData({
                ...marksData, "totalFullMakrs": parseInt(marksData?.totalEnglishMarks) + parseInt(marksData?.totalFrenchMarks) +
                    parseInt(marksData?.totalKinyarwandaMarks) + parseInt(marksData?.totalMathMarks) + parseInt(marksData?.totalSocialMarks)
            });
            setIstotalFullMakrsEmpty(true)
        }
        if (isTotalFullMarksEmpty === true && isTotalFullMarksEmpty === true) {
            setmarksData({ ...marksData, "percentage": })

        }

        // axios.post(`${BASE_URL}/marks`)

    };

    return (
        <div className="login-form-container">
            <div className="text-center font-bold app-color uppercase text-xl header-reg px-10">
                Add Marks Info
            </div>

            <form onSubmit={handleSubmit} noValidate>

                <div className="schoolmanager-container w-full max-w-xs mx-auto mt-4">
                    <div className="grid grid-cols-6 grid-rows-2  gap-8">
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 ">
                            <Select
                                options={studentsOptions}
                                onChange={(payload) => selectHandler({ ...payload, name: "student" })}
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">

                            <Input
                                name="mathMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Student Math Marks"
                                placeholder="Math Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalMathMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Total Math Marks"
                                placeholder="Total Math Marks"
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="englishMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Student English Marks"
                                placeholder="Student English Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalEnglishMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Total English Marks"
                                placeholder="Total English Marks"
                                className="login-input"
                                required
                            />

                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="socialMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Student Social Marks"
                                placeholder="Student Social Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalSocialMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Total Social Marks"
                                placeholder="Total Social Marks"
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
                                name="totalFrenchMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Total French Marks"
                                placeholder="Total French Marks"
                                className="login-input"
                                required
                            />


                        </div>

                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="totalMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Student Total Marks"
                                placeholder="Student Total
                                 Marks"
                                className="login-input"
                                required
                                disabled
                            />
                            <Input
                                name="totalFullMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Total Full Marks"
                                placeholder="Total Full Marks"
                                className="login-input"
                                required
                                disabled
                            />


                        </div>

                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="averageMarks"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Average Marks"
                                placeholder="Average Marks"
                                className="login-input"
                                required
                                disabled
                            />
                            <Input
                                name="percentage"
                                inputHandler={inputHandler}
                                type="number"
                                labelName="Percentage"
                                placeholder="Percentage"
                                className="login-input"
                                required
                                disabled
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