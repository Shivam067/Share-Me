import React from "react";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";

function Header(){

    const isAuth = useSelector((state)=> state.auth.status)

    const navigate = useNavigate();

    // here we are making an array of all the nav buttons and then we can iterate it, so in future if we need to add another btton then we have to just add it in the array and it will be added in the header.
    const navItems = [
        {
            name: "Home",
            path: "/",
            isActive: true
        },
        {
            name: "Login",
            path: "/login",
            isActive: !isAuth
        },
        {
            name: "Singup",
            path: "/signup",
            isActive: !isAuth
        },
        {
            name: "My Posts",
            path: "/my-posts",
            isActive: isAuth
        },
        {
            name: "Add Post",
            path: "/add-post",
            isActive: isAuth
        },
    ]

  return (
    <header>
            <div className="flex justify-between bg-[#1B1B1B] p-2 text-white">
                <div>
                    <Link to="/">
                        <Logo width="70px" />
                    </Link>
                </div>
                <ul className='flex gap-1 items-center'>
                    {navItems.map((item)=>{
                        return item.isActive ? (
                            <NavLink
                            to={item.path}
                            className={({isActive})=>{
                                return `inline-bock px-6 py-2 duration-200 hover:bg-slate-100 hover:text-gray-600 rounded-full ${isActive ? 'bg-slate-100 text-gray-600' : ""}`
                            }}
                            >
                                <li key={item.name}>
                                    {item.name}
                                </li>
                            </NavLink>
                        ) : null
                    })}
                    {isAuth && (
                        <li>
                            < LogoutBtn 
                            />
                        </li>
                    )}
                </ul>
            </div>
    </header>
    
  );
}

export default Header;