import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";


export default function Users() {

    const [Users, setUser] = useState([]);
    const [run, setRun] = useState(0)

    const cookie = new Cookies()
    const token = cookie.get("Bearer")



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/show`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then(data => setUser(data.data))
            .catch((err) => console.log(err))
    }, [run])

    async function deleteItem(id) {
        const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        try {
            if (res.status === 200) {
                setRun(prev => prev + 1)
            }
        } catch (err) {
            console.log(err)
        }

    }


    const showData = Users.map((user, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`${user.id}`}>
                    <i className="fa-solid fa-pen-to-square" style={{ fontSize: "20px" }}>
                    </i>

                </Link>
                <i onClick={() => deleteItem(user.id)} className="fa-solid fa-trash" style={{ color: "red", fontSize: "20px", paddingLeft: "7px", cursor: "pointer" }}></i> </td>
        </tr>

    ))





    return (<div style={{ padding: "20px" }}>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {showData}
            </tbody>
        </table>
    </div>
    )
}