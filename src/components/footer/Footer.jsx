import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer(){
  return (
    <section className="relative overflow-hidden py-10 bg-[#1B1B1B] border-t-2 border-t-slate-100">
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-slate-100">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-100">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-7  text-xs font-semibold uppercase text-slate-50">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-gray-700"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-gray-700"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-7  text-xs font-semibold uppercase text-slate-50">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-gray-700"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-gray-700"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-7  text-xs font-semibold uppercase text-slate-50">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-gray-700"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-gray-700"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
}

export default Footer;