import { LogoutButton } from "@/components/ui/logoutButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Share } from "lucide-react"
import LikeButton from "./like-button"
import LikedByText from "@/components/liked-by-text"
import CommentAccordion from "@/components/comment-accordion"

interface Props {
    posts: Post[],
    user: User
}

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

export default function PostMap({posts, user}: Props) {
            
    return (
            <div className="w-full flex flex-col items-center">
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
                            <CommentAccordion userID={user.id} postID={post.id}/>
                        </Card>
                        )
                    })
                }
                <LogoutButton className="hover:cursor-pointer">Log out</LogoutButton>
            </div>

    )
}