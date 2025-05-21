import axios from "axios"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"

export default function Header() {

    const cookie = new Cookies()
    const token = cookie.get("Bearer", { path: "/" })

    async function handleLogout() {
        await axios.post("http://127.0.0.1:8000/api/logout", null, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        cookie.remove("Bearer", { path: "/" })
        window.location.pathname = "/"
    }

    return <div className="container shadow"><nav className="flex-d p-2">
        <div className="flex-d" >
            <Link to={"/"} className="Home-s">Home</Link>
            <Link to={"/About"} className="Home-s">About</Link>
        </div>
        <div className="flex-d">
            {!token ? (
                <>
                    <Link to="/register" style={{ textAlign: "center" }} className="register-nav">Register </Link>
                    <Link to="/login" style={{ textAlign: "center" }} className="register-nav">Login </Link>
                </>
            ) : (

                <>
                    <Link to="/dashboard" style={{ textAlign: "center" }} className="register-nav">Dashboard </Link>
                    <div className="register-nav" onClick={handleLogout} >LogOut</div>
                </>
            )}
        </div>

    </nav >
    </div >
}