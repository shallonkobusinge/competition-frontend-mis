import React, { useEffect, useState } from "react";
import "../styles/register.css";
import Input from '../components/Input'
import Select from 'react-select'
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from '../utils/baseUrl'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { getAllStudents } from '../services/students'
import authHeader from '../services/authHeader'
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
        percentage: ""

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
        console.log('agin', marksData.frenchMarks)
        const marksDataTotals = (parseInt(marksData.englishMarks) + parseInt(marksData.frenchMarks) +
            parseInt(marksData.kinyarwandaMarks) + parseInt(marksData.socialMarks) + parseInt(marksData.mathMarks));

        console.log('1', (parseInt(marksData.englishMarks)));
        console.log('2', ((marksData.frenchMarks)));
        console.log('3', (parseInt(marksData.kinyarwandaMarks)));
        console.log('4', (parseInt(marksData.socialMarks)));
        console.log('5', (parseInt(marksData.mathMarks)));
        console.log('6', (parseInt(marksData.totalMarks)));

        console.log('sdjfadfsa', (parseInt(marksData.englishMarks) + parseInt(marksData.frenchMarks) +
            parseInt(marksData.kinyarwandaMarks) + parseInt(marksData.socialMarks) + parseInt(marksData.mathMarks)))


        const marksDataFullTotals = (parseInt(marksData.totalEnglishMarks) + parseInt(marksData.totalFrenchMarks) +
            parseInt(marksData.totalKinyarwandaMarks) + parseInt(marksData.totalMathMarks) + parseInt(marksData.totalSocialMarks))
        // console.log(marksData)
        // console.log(marksDataTotals, marksDataFullTotals)
        // console.log(marksDataTotals + marksDataFullTotals / 5)
        console.log(marksData?.englishMarks !== "" && marksData?.frenchMarks !== "" && marksData?.kinyarwandaMarks !== "" &&
            marksData?.mathMarks !== "" && marksData?.socialMarks !== "")
        console.log(marksData?.totalEnglishMarks !== "" && marksData?.totalFrenchMarks !== "" && marksData?.totalKinyarwandaMarks !== ""
            && marksData?.totalMathMarks !== "" && marksData?.totalSocialMarks !== "")

        if (marksData?.englishMarks !== "" && marksData?.frenchMarks !== "" && marksData?.kinyarwandaMarks !== "" &&
            marksData?.mathMarks !== "" && marksData?.socialMarks !== "") {
            console.log('working', marksDataTotals)
            setmarksData({
                ...marksData, "totalMarks": marksDataTotals
            })
            setmarksData({
                ...marksData, "averageMarks": (marksDataTotals) / 5
            })
            setIstotalMakrsEmpty(true)
        }
        if (marksData?.totalEnglishMarks !== "" && marksData?.totalFrenchMarks !== "" && marksData?.totalKinyarwandaMarks !== ""
            && marksData?.totalMathMarks !== "" && marksData?.totalSocialMarks !== "") {
            setmarksData({
                ...marksData, "totalFullMarks": marksDataFullTotals
            });
            setIstotalFullMakrsEmpty(true)
        }
        console.log(isTotalMarksEmpty === true && isTotalFullMarksEmpty === true)
        if (isTotalMarksEmpty === true && isTotalFullMarksEmpty === true) {
            setmarksData({ ...marksData, "percentage": (marksDataTotals + marksDataFullTotals / 5) * 100 })

        }
        // console.log(marksData)
    };
    const selectHandler = (payload) => {
        var name = payload.name;
        var value = payload.value;
        setmarksData({ ...marksData, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(marksData)

        axios.post(`${BASE_URL}/marks`, marksData, { headers: authHeader() })
            .then((response) => {
                toast.success(" Marks Added Successfully")
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            })

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
                                type="text"
                                labelName="Student Math Marks"
                                placeholder="Math Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalMathMarks"
                                inputHandler={inputHandler}
                                type="text"
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
                                type="text"
                                labelName="Student English Marks"
                                placeholder="Student English Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalEnglishMarks"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Total English Marks"
                                placeholder="Total English Marks"
                                className="login-input"
                                required
                            />

                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="kinyarwandaMarks"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Student Kinyarwanda Marks"
                                placeholder="Student Kinyarwanda Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalKinyarwandaMarks"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Total Kinyarwanda Marks"
                                placeholder="Total Kinyarwanda Marks"
                                className="login-input"
                                required
                            />

                        </div>
                        <div className="col-span-6 gap-6 sm:col-span-6 sm:row-span-1 flex w-96">
                            <Input
                                name="socialMarks"
                                inputHandler={inputHandler}
                                type="text"
                                labelName="Student Social Marks"
                                placeholder="Student Social Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalSocialMarks"
                                inputHandler={inputHandler}
                                type="text"
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
                                type="text"
                                labelName="Student French Marks"
                                placeholder="Student French Marks"
                                className="login-input"
                                required
                            />
                            <Input
                                name="totalFrenchMarks"
                                inputHandler={inputHandler}
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
                                labelName="Average Marks"
                                placeholder="Average Marks"
                                className="login-input"
                                required
                                disabled
                            />
                            <Input
                                name="percentage"
                                inputHandler={inputHandler}
                                type="text"
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