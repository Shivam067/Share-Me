import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { addAllPosts } from '../store/PostSlicer'
import databaseService from '../Appwrite/Conf'

function MyPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {}, [])

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
    const allPosts = useSelector((state) => state.post.allPosts)

    useEffect(() => {
        if(allPosts.length > 0){
            const myPosts = allPosts.filter((post) => post.userID === userData.$id)
            setPosts(myPosts)
            setIsLoading(false)
        }
    }, [allPosts])

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