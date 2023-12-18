import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Appwrite/Auth";
import { useState } from "react";
import { Input, Button, Logo } from "./index"
import { login as storeLogin } from "../store/AuthSlicer";
import { useDispatch } from "react-redux";
import {useForm} from "react-hook-form"

function Login(){
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    // register is just a keyword which stores data in the form of key object type pair.
    // handleSubmit is a function which is used to handle the submit event of the form.
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const login = async(data) => {
        setError(null)
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.currentSession()
                if(userData) dispatch(storeLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-[#1B1B1B] text-slate-100 rounded-xl p-10 border border-white/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-slate-100/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        // we allways use the spread operator to pass the register object to the input component becouse it will contain other key objects as well from other input feild called in the same file. if we dont use the spread operator then the other key objects will be overwritten.
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                        />
                        <Button
                        type="submit"
                        className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;