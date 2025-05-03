import axios from "axios"
import { LogoutButton } from "@/components/ui/logoutButton"

interface Post {
    id: number,
    authorID: number,
    createdAt: Date,
    content: string
}

async function getPosts(): Promise<Post[]> {
    try {
        const res = await axios.get("http://localhost:4000/api/posts");
        return res.data;
    } catch(err) {
        console.log(err);
        return [];
    }
}

export default async function HomePage() {
    const posts = await getPosts();

    return (
        <div>
            {posts.map((post: Post) => {
                return (
                    <div key={post.id}>
                        <div>{post.content}</div>
                    </div>
                )
            })}
            <LogoutButton className="hover:cursor-pointer">Log out</LogoutButton>
        </div>
    )
}