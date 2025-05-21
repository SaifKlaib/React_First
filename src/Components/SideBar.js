import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="side-bar">
            <NavLink to="/dashboard/users" activeclassname="active" className="item-link"><i className="fa-solid fa-users"></i>Users</NavLink>
            <NavLink to="/dashboard/user/create" activeclassname="active" className="item-link"><i className="fa-solid fa-user-plus"></i>New users</NavLink>
            <NavLink to="/dashboard/products" activeclassname="active" className="item-link"><i className="fa-solid fa-brands fa-product-hunt"></i>Products</NavLink>
            <NavLink to="/dashboard/product/create" activeclassname="active" className="item-link"><i className="fa-solid fa-plus"></i>Create Product</NavLink>
        </div>
    )
}