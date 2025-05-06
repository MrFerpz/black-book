import axios from "axios"
import Image from 'next/image'
import Logo from "../../../public/bbLogoCropped.png"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/ui/logoutButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NewPostDrawer from "../../components/new-post-drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Share } from "lucide-react"
import { cookies } from "next/headers"
import LikeButton from "../../components/like-button"
import LikedByText from "@/components/liked-by-text"

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
        const res = await axios.get("http://localhost:4000/api/posts", { withCredentials: true })
        const posts = res.data;
        return posts
    } catch(err) {
        console.log(err);
        return [];
    }
}

async function getUser(): Promise<User> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");
        const res = await axios.get("http://localhost:4000/api/user", {
            headers: {
                Cookie: token ? `token=${token.value}` : "",
            }
        });
        const user = res.data
        return user;
    } catch(err) {
        console.log(err);
        return {username: "", id: 0}
    }
}

export default async function HomePage() {
    const posts = await getPosts();
    const user = await getUser();

    async function likePost(postID: number) {
        try {
            await axios.post(`http://localhost:4000/api/${postID}/like`, {username: user.username}, {withCredentials: true});
        } catch(err) {
            console.log(err)
        }
    }

    if (posts)
    return (
            <div className="w-full h-full flex flex-col justify-content items-center">
                <div className="h-[20px]"/>
                <Image style={{height: "auto"}} width={300} priority={true} alt="Black Book Logo" src={Logo}></Image>
                <Separator className="my-4"/>
                <div className="h-[35px]">What's cookin', <b>{user.username}</b>?</div>
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
                                <div className="flex w-[4/10] pl-[24px] gap-2">
                                    <LikeButton userID={user.id} postID={post.id}/>
                                    <MessageSquare className="hover:cursor-pointer hover:opacity-40"/>
                                    <Share className="hover:cursor-pointer hover:opacity-40"/>
                                </div>
                                <LikedByText postID={post.id}/>
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