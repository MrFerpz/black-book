import axios from "axios"
import { LogoutButton } from "@/components/ui/logoutButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NewPostDrawer from "../../components/new-post-drawer"

interface Post {
    id: number,
    authorID: number,
    createdAt: Date,
    content: string,
    author: User
}

interface User {
    id: number,
    username: string,
    name: string
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
            <div className="w-full">
                {posts.map((post: Post) => {
                    return (
                        <Card className = "w-9/10 mb-5 mt-5" key = {post.id}>
                            <CardHeader>
                                <CardTitle>Post by {post.author.username}</CardTitle>
                            </CardHeader>
                            <CardContent>{post.content}</CardContent>
                            <CardFooter>
                                Posted at DATE
                            </CardFooter>
                        </Card>
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