import { Link } from "react-router-dom"

export default function TopBar() {
    return (<div className="flex-d container shadow">
        <h1>Store</h1>
        <Link to="/" className="register-nav" >Go back to Website</Link>

    </div>
    )
}