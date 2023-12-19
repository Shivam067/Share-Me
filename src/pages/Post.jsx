import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../Appwrite/Conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyPost } from "../store/PostSlicer";

export default function Post() {
    const [post, setPost] = useState(null);

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.allPosts)

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setPost(posts.find((post) => post.$id === slug))
        } else navigate("/");
    }, [slug, navigate, posts]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteImage(post.image);
                dispatch(deleteMyPost(post.$id))
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container className="lg:w-2/4 md:w-3/4 w-full">
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-xl mb-6">
                    {parse(post.content)}
                </div>
                <div className="w-full mx-auto flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={databaseService.getFilePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : (<div className="w-full py-8 mt-4 text-center">
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
    );
}
