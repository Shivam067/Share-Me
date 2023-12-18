import React from "react";
import { Link } from "react-router-dom";
import databaseService from "../Appwrite/Conf";

function PostCard({$id, title, image}){

    return(
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-[#3D3C3A] rounded-xl p-2 flex-col h-[80vh] md:h-[65vh] lg:h-[50vh]'>
                <div className='w-full h-[70%] mb-4'>
                    <img className='w-full h-[100%] rounded-xl object-cover' src={databaseService.getFilePreview(image)} alt={title}
                    />
                </div>
                <div className="w-full h-[25%] flex items-center justify-center">
                    <h2
                    className='text-xl font-bold text-center text-slate-100'
                    >{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard;