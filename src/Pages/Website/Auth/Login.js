import { useContext, useState } from "react"
import Header from "../../../Components/Header"
import axios from "axios"
import { User } from "./../Context/UserContext"
import "../../../style.css"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"

export default function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const [accept, setAccept] = useState(false)
    const [err, setErr] = useState(false)

    const nav = useNavigate();

    const cookie = new Cookies();


    // get user
    const user = useContext(User);


    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            // send data
            let res = await axios.post(`http://127.0.0.1:8000/api/login`, {

                email: email,
                password: password,

            });
            const token = res.data.data.token
            cookie.set("Bearer", token)
            const userDetails = res.data.data.user;
            user.setAuth({ token, userDetails })
            nav("/dashboard")

        } catch (err) {
            if (err.response.status === 401) {
                setErr(true)
            }
            setAccept(true)
        }


    }

    return (
        <div>
            <Header />
            <div className="parent login">
                <div className="register login" >
                    <form onSubmit={submit} >

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email...." required value={email} onChange={(e) => setemail(e.target.value)}></input>
                        <label htmlFor="Pass">Password: </label>
                        <input id="Pass" type="password" placeholder="Password...." value={password} onChange={(e) => setpassword(e.target.value)}></input>
                        {password.length < 8 && accept && <p className="error">Password is too short</p>}

                        <div style={{ textAlign: "center" }}>
                            <button type="submit" >Login</button>
                        </div>
                        {accept && err && <p className="error">Wrong Email or Password </p>}
                    </form>
                </div>
            </div>
        </div>
    )
}