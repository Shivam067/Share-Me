import React from "react";
import { Logo } from "../index";

function Footer(){
    return (
    <section className="relative overflow-hidden py-10 bg-[#1B1B1B] border-t-2 border-t-slate-100">
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-slate-100">
                    <div className="flex h-full justify-center gap-5 items-center">
                        <div className="inline-flex items-center">
                            <Logo width="100px" />
                        </div>
                        <div>
                            <p className="text-base text-slate-100">
                                &copy; Copyright 2023. All Rights Reserved by DevUI.
                            </p>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Footer;