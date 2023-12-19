import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import databaseService from '../Appwrite/Conf';
import { useNavigate,  useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const allPosts = useSelector((state) => state.post.allPosts)
    useEffect(() => {
        if (slug) {
            const findPost = allPosts.find((post) => post.$id === slug)
            if (findPost) {
                setPost(findPost)
            }
        } else {
            navigate('/')
        }
    }, [slug, navigate, allPosts])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost