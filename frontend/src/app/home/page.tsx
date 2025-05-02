"use client"
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

interface Post {
    id: number,
    authorID: number,
    createdAt: Date,
    content: string
}

export default function Home() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[] | []>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        try {
            const res = await axios.get("http://localhost:4000/api/posts");
            const allPosts: Post[] = res.data;
            console.log(allPosts);
            setPosts(allPosts);
            setLoading(false);
        } catch(err) {
            console.log(err)
        }
    }

    async function logout() {
        try {
            await axios.get("http://localhost:4000/api/logout");
            router.push("/");
        } catch(err) {
            console.log(err)
        }
    }

    if (loading) {
        return (
            <div>Loading posts...</div>
        )
    }
    
    return (
        <div>
            {posts.map((post: Post) => {
                return (
                    <div key={post.id}>
                        <div>{post.content}</div>
                    </div>
                )
            })}
        <a className="text-blue-600 hover:cursor-pointer" onClick={logout}>Logout</a>
        </div>
    )}