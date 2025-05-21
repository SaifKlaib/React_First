import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";


export default function Products() {

    const [Products, setProduct] = useState([]);
    const [run, setRun] = useState(0)

    const cookie = new Cookies()
    const token = cookie.get("Bearer")



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/show`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then(data => setProduct(data.data))
            .catch((err) => console.log(err))
    }, [run])

    async function deleteItem(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })

            if (res.status === 200) {
                setRun(prev => prev + 1)
            }
        } catch (err) {
            console.log(err)
        }

    }


    const showData = Products.map((product, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                    <i className="fa-solid fa-pen-to-square" style={{ fontSize: "20px" }}>
                    </i>

                </Link>
                <i onClick={() => deleteItem(product.id)} className="fa-solid fa-trash" style={{ color: "red", fontSize: "20px", paddingLeft: "7px", cursor: "pointer" }}></i> </td>
        </tr>

    ))





    return (<div style={{ padding: "20px" }}>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
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