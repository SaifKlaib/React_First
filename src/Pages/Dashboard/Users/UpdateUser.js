import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "../../Website/Context/UserContext"
import { useNavigate } from "react-router-dom"

export default function UpdateUser() {
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [passwordConfirmation, setpasswordConfirmation] = useState("")
    const [accept, setAccept] = useState(false)
    const [emailError, setemailError] = useState(false)

    const context = useContext(User)
    const token = context.auth.token

    const nav = useNavigate();

    const id = window.location.pathname.split("/").slice(-1)[0]

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setemail(data[0].email)
                setName(data[0].name)
            })
    }, [])





    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            // send data
            let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            nav("/dashboard/users")

        } catch (err) {
            if (err.response.status === 422) {
                setemailError(true)
            }
            setAccept(true)
        }


    }





    return (
        <div>
            <div>
                <div className="register " >
                    <form onSubmit={submit} >
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Name...." required value={name} onChange={(e) => setName(e.target.value)} ></input>
                        {name.length === 0 && accept && <p className="error">Please enter your name</p>}
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email...." required value={email} onChange={(e) => setemail(e.target.value)}></input>
                        {accept && emailError && <p className="error">Email is already been taken </p>}
                        <label htmlFor="Pass">Password: </label>
                        <input id="Pass" type="password" placeholder="Password...." value={password} onChange={(e) => setpassword(e.target.value)}></input>
                        {password.length < 8 && accept && <p className="error">Password is too short</p>}
                        <label htmlFor="RepPass">Reapet Password</label>
                        <input type="password" id="RepPass" placeholder="Reapet password...." value={passwordConfirmation} onChange={(e) => setpasswordConfirmation(e.target.value)}></input>
                        {password !== passwordConfirmation && accept && <p className="error">Password doesn`t match</p>}
                        <div style={{ textAlign: "center" }}>
                            <button type="submit"   >Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}