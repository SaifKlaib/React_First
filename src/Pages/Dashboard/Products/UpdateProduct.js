import { useEffect, useState } from "react"

import axios from "axios"
import "../../../style.css"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"


export default function UpdateProduct() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [accept, setAccept] = useState(false)

    const id = window.location.pathname.split("/").slice(-1)[0]

    const cookie = new Cookies()
    const token = cookie.get("Bearer")

    const nav = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then(data => {
                console.log(data)
                setTitle(data.data[0].title)
                setDescription(data.data[0].description)
            })
            .catch((err) => console.log(err))
    }, [])

    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            const formData = new FormData();
            formData.append("title", title)
            formData.append("description", description)
            formData.append("image", image)
            // send data
            let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                });
            console.log(res)
            nav("/dashboard/products")

        } catch (err) {
            console.log(err)
            setAccept(true)
        }


    }

    return (
        <div>
            <div>
                <div className="register " >
                    <form onSubmit={submit} >
                        <label htmlFor="name">Title</label>
                        <input id="name" type="text" placeholder="Title...." required value={title} onChange={(e) => setTitle(e.target.value)} ></input>
                        {title.length === 0 && accept && <p className="error">Please enter a title</p>}
                        <label htmlFor="email">Description</label>
                        <input type="text" id="email" placeholder="Description...." required value={description} onChange={(e) => setDescription(e.target.value)}></input>
                        {/* {accept && emailError && <p className="error">Email is already been taken </p>} */}
                        <label htmlFor="Pass">image: </label>
                        <input id="Pass" type="file" placeholder="Password...." onChange={(e) => setImage(e.target.files.item(0))}></input>
                        {/* {password.length < 8 && accept && <p className="error">Password is too short</p>} */}

                        <div style={{ textAlign: "center" }}>
                            <button type="submit"   >Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}