import axios from "axios"
import Image from 'next/image'
import Logo from "../../../public/bbLogoCropped.png"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/ui/logoutButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NewPostDrawer from "../../components/new-post-drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Share } from "lucide-react"

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
}

async function getPosts(): Promise<Post[]> {
    try {
        const res = await axios.get("http://localhost:4000/api/posts", {withCredentials: true});
        const posts = res.data
        return posts
    } catch(err) {
        console.log(err);
        return [];
    }
}

async function getUser() {
    try {
        const res = await axios.get("http://localhost:4000/api/user");
        return res.data;
    } catch(err) {
        console.log(err)
    }
}

export default async function HomePage() {
    const currentUser: any = getUser();
    const posts = await getPosts();

    async function likePost(postID: number) {
        try {
            await axios.post(`http://localhost:4000/api/${postID}/like`, {username: currentUser[0]}, {withCredentials: true});
        } catch(err) {
            console.log(err)
        }
    }

    if (posts)
    return (
            <div className="w-full h-full flex flex-col justify-content items-center">
                <div className="h-[20px]"/>
                <Image width="300" height="159" alt="Black Book Logo" src={Logo}></Image>
                <Separator className="my-4"/>
                <div className="h-[35px]">What's cookin', {currentUser[0]}?</div>
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
                                <CardHeader className="flex">
                                    <Avatar>
                                        <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="m-2">
                                    {post.author.username}
                                    </CardTitle>
                                    <div className="flex w-1/1 justify-end">
                                        <CardContent className="text-xs m-2 justify-self-end">@{time} on {date}</CardContent>
                                    </div>
                                </CardHeader>
                                <CardContent>{post.content}</CardContent>

                                Put into a separate function - keep the on-click function props here though so we can access post.id, author.id
                                <div className="flex w-[4/10] pl-[24px] gap-2">
                                    <Button onClick={likePost(post.id)}><ThumbsUp className="hover:cursor-pointer hover:opacity-40"/></Button>
                                    <MessageSquare className="hover:cursor-pointer hover:opacity-40"/>
                                    <Share className="hover:cursor-pointer hover:opacity-40"/>
                                </div>
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