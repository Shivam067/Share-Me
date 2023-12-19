import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import databaseService from "../../Appwrite/Conf.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updateMyPost } from "../../store/PostSlicer.js";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setIsLoading(true)
        if (post) {
            const file = data.image[0]
                ? await databaseService.uploadImage(data.image[0])
                : null;

            if (file) {
                databaseService.deleteImage(post.image);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : undefined,
            });

            if (dbPost) {
                const id = post.$id;
                console.log(dbPost)
                dispatch(updateMyPost(dbPost, id))
                setIsLoading(false)

                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // todo - check if need to check for image
            const file = await databaseService.uploadImage(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.image = fileId;
                const dbPost = await databaseService.createPost({
                    ...data,
                    userID: userData.$id,
                });

                if (dbPost) {
                    dispatch(addPost(dbPost))
                    setIsLoading(false)
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        // putting a function in subscription and returning a function with unsubscribe will improve efficiency
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return isLoading ? (
        <div className="w-full py-8 mt-4 text-center">
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Loading...
                        </h1>
                    </div>
                </div>
        </div>
    ) :
    
    (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-[#222f3e] text-slate-100"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-[#222f3e] text-slate-100"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="image :"
                    type="file"
                    className="mb-4 bg-[#222f3e] text-slate-100"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-slate-100 text-grey-400"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
