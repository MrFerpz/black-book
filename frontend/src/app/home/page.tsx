import axios from "axios"
import { useEffect, useState } from "react";

interface Post {
    id: number,
    authorID: number,
    createdAt: Date,
    content: string
}

export default function Home() {
    const [posts, setPosts] = useState<Post[] | []>([]);

    async function getPosts() {
        try {
            const res = await axios.get("http://localhost:4000/api/posts");
            const allPosts: Post[] = res.data
            setPosts(allPosts)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])
    
    if (posts) {
    return (
        posts.map((post: Post) => {
            <div>{post.content}</div>
        })
    )}

    else return (
        <div>No posts yet.</div>
    )
}