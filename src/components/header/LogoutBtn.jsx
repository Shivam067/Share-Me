import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlicer.js";
import authService from "../../Appwrite/Auth.js";

function LogoutBtn(){
    const dispatch = useDispatch();

    function btnHandler(){
        authService.logout()
        .then((res)=>{
            if(res){
                dispatch(logout())
            }
        })
    }


  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
    onClick={btnHandler}
    >
        Logout</button>
  );
}

export default LogoutBtn;