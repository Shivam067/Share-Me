import React, {useEffect, useState} from 'react'
import databaseService from '../Appwrite/Conf'
import {Container, PostCard} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { addAllPosts } from '../store/PostSlicer'

function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const dispatched = useDispatch()

    useEffect(()=>{
            databaseService.getAllPost()
            .then((res)=>{
            if(res){
                dispatched(addAllPosts(res.documents))
            }
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [])

    const posts = useSelector((state) => state.post.allPosts)
    useEffect(() => {
        if(posts.length > 0){
            setIsLoading(false)
        }
    }, [posts])

    if (isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        post.status==='active' ?
                        <div key={post.$id} className='p-2 lg:w-1/4 md:w-1/2 sm:w-full'>
                            <PostCard {...post} />
                        </div>
                        : null
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home