import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../Appwrite/Conf'
import { useSelector } from 'react-redux'

function MyPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userData = useSelector((state) => state.userData);
    useEffect(() => {}, [])
    databaseService.getMyPost({userData}).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    .finally(() => {
        setIsLoading(false)
    })
    if(isLoading){
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
    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Post your first photo 🤩
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 lg:w-1/4 md:w-1/2 sm:w-full'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default MyPosts