import { getLoggedInUser } from '../services/students'
import React from 'react'
import { useHistory } from 'react-router-dom'
const Navbar = ({ children, showUser }) => {
    let history = useHistory()
    const [currentUser, setCurrentUser] = React.useState({})
    const sendData = async () => {
        return await getLoggedInUser()
    }
    React.useEffect(async () => {
        setCurrentUser(await sendData())
    }, [])

    const logout = () => {
        sessionStorage.removeItem("token")
        setTimeout(() => history.push('/login'), 200)

    }
    return (
        <div>
            <div className="flex justify-between p-3 app-background text-white">
                <div>SUNLIGHT</div>
                {showUser === false ? null :
                    <>
                        <div className="flex">

                            <div className="mr-6">User</div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="cursor-pointer" onClick={() => logout()}><path fill="none" d="M0 0h24v24H0z" /><path d="M6.265 3.807l1.147 1.639a8 8 0 1 0 9.176 0l1.147-1.639A9.988 9.988 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12a9.988 9.988 0 0 1 4.265-8.193zM11 12V2h2v10h-2z" fill="rgba(253,248,248,1)" /></svg>
                        </div>
                    </>

                }



            </div>
            <div>
                {children}
            </div>
        </div>

    )
}

export default Navbar