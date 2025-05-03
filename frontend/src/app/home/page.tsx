import axios from "axios"
import { LogoutButton } from "@/components/ui/logoutButton"
import NewPostDrawer from "../../components/new-post-drawer"

interface Post {
    id: number,
    authorID: number,
    createdAt: Date,
    content: string
}

async function getPosts(): Promise<Post[]> {
    try {
        const res = await axios.get("http://localhost:4000/api/posts");
        const posts = res.data
        return posts
    } catch(err) {
        console.log(err);
        return [];
    }
}

export default async function HomePage() {
    const posts = await getPosts();

    if (posts)
    return (
        <div>
            <div>
                {posts.map((post: Post) => {
                    return (
                        <div key={post.id}>
                            <div>{post.content}</div>
                        </div>
                        )
                    })
                }
                <LogoutButton className="hover:cursor-pointer">Log out</LogoutButton>
                <NewPostDrawer/>
            </div>
        </div>
    )

    else return (
        <div>No posts are available yet.</div>
    )
}