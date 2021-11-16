import axios from 'axios'
import BASE_URL from '../utils/baseUrl'
import authHeader from './authHeader'
export async function getAllStudents() {

    let students = []
    await axios.get(`${BASE_URL}/students`, { headers: authHeader() })
        .then((response) => {
            for (let student of response?.data?.data) {
                let data = {
                    label: student?.name,
                    value: student?._id
                }
                students.push(data)
                return students
            }
            console.log(response)
        }).catch((error) => {

        })
    return students

}