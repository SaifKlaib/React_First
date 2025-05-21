import SignUp from "./Pages/Website/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Website/Auth/Login";
import Home from "./Pages//Website/Home";
import About from "./Pages/Website/About";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/User";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/createUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersisLogin from "./Pages/Website/Auth/PersisLogin";
import Products from "./Pages/Dashboard/Products/Products";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";
import CreateProduct from "./Pages/Dashboard/Products/createProduct";



export default function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        {/* Protected Routes */}
        <Route element={<PersisLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} >
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

