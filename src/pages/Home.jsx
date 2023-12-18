import React, {useEffect, useState} from 'react'
import databaseService from '../Appwrite/Conf'
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // without loading sign

    // useEffect(() => {
    //     databaseService.getAllPost([]).then((posts) => {
    //         if (posts) {
    //             // console.log(posts)
    //             setPosts(posts.documents)
    //         }
    //     })
    // }, [])

    // with loading sign but error is not deal

    // useEffect(() => {
    //     async function fetchPosts() {
    //         try {
    //             const posts = await databaseService.getAllPost([])
    //             if (posts) {
    //                 setPosts(posts.documents)
    //                 setIsLoading(false)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchPosts()
    // }
    //     , [])

    // perfect

    useEffect(() => {
        databaseService.getAllPost().then((posts) => {
            if (posts) {
                // console.log(posts)
                setPosts(posts.documents)
            }
        })
        .catch((error)=>{
            console.log(error)
            setError(error)
        })
        .finally(()=>{setIsLoading(false)})
    }, [])

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
    else if(error) return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            {error}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
    else return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home