import React from 'react'
import Navbar from '../components/Navbar'
import TableHeader from '../components/TableHeader'
import MarksTable from '../components/MarksTable'
import StudentsTable from '../components/StudentsTable'
import RegisterStudent from '../components/RegisterStudent'
import RegisterMarks from '../components/RegisterMarks'
const SchoolEntry = () => {
    const [activeTab, setActiveTab] = React.useState("STUDENTS");
    const [showForm, setShowForm] = React.useState("false")
    const showFormView = (newValue) => {
        setShowForm(newValue)
    }
    const changeActiveTab = (newValue) => {
        setActiveTab(newValue)
        showFormView("false")

    }
    const schoolTabs = [
        {
            title: "STUDENTS"
        },

        {
            title: "MARKS"
        }
    ]
    let tabs = new Set()
    schoolTabs.forEach((tab) => {
        tabs.add(tab.title)
    })
    tabs = [...tabs]
    return (
        <>
            <Navbar>
                <TableHeader tabs={[...tabs]} activeTab={activeTab}
                    changeActiveTab={changeActiveTab}
                >
                    {activeTab === "STUDENTS" ?
                        <button className="register-buttons" onClick={() => showFormView("Students")}>Add New Student</button>
                        :
                        <button className="register-buttons" onClick={() => showFormView("Marks")}>Add Marks</button>
                    }

                </TableHeader>

                {(showForm === "Students" && activeTab === "STUDENTS") ? <RegisterStudent showFormView={showFormView} /> : (showForm !== "Students" && activeTab === "STUDENTS") ? <StudentsTable /> :
                    (showForm === "Marks" && activeTab === "MARKS") ? <RegisterMarks showFormView={showFormView} /> : (showForm !== "Marks" && activeTab === "MARKS") ? <MarksTable /> : ""}



            </Navbar>

        </>
    )
}


export default SchoolEntry