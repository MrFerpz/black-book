import axios from "axios"
import Image from 'next/image'
import Logo from "../../../public/bbLogoCropped.png"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/ui/logoutButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NewPostDrawer from "../../components/new-post-drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
    id: number,
    authorID: number,
    created_at: string,
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

async function getUser() {

}

export default async function HomePage() {
    const posts = await getPosts();

    if (posts)
    return (
        <div className="w-full h-full flex flex-col justify-content items-center">
            <div className="h-[20px]"/>
            <Image width="300" height="159" alt="Black Book Logo" src={Logo}></Image>
            <Separator className="my-4"/>
            <div className="h-[35px]">What's cookin'?</div>
                <NewPostDrawer/>
            <Separator className="my-4"/>
            <div className="w-full">
                {posts.map((post: Post) => {
                    // format date & time
                    const removedTZ = post.created_at.split(".");
                    const formattedDate = removedTZ[0].split("T");
                    const time = formattedDate[1];
                    const date = formattedDate[0];
                    return (
                        <Card className = "w-9/10 mb-5 mt-5" key = {post.id}>
                            <CardHeader className="flex space-between">
                                <CardTitle>
                                    <Avatar>
                                        <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                                    </Avatar>
                                    {post.author.username}
                                </CardTitle>
                                <CardContent className="text-xs">@{time} on {date}</CardContent>
                            </CardHeader>
                            <CardContent>{post.content}</CardContent>
                        </Card>
                        )
                    })
                }
                <LogoutButton className="hover:cursor-pointer">Log out</LogoutButton>
            </div>
        </div>
    )

    else return (
        <div>No posts are available yet.</div>
    )
}