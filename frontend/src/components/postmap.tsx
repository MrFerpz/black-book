
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LikeButton from "./like-button"
import LikedByText from "@/components/liked-by-text"
import CommentAccordion from "@/components/comment-accordion"
import { Post, SimpleUser, User } from "@/app/interfaces/interfaces"
import { Forward, MessageSquare } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"

interface Props {
    posts: Post[],
    userID: number
}

export default function PostMap({posts, userID}: Props) {

    if (posts.length > 0) {
    return (
            <div className="w-full flex flex-col items-center">
                {posts.map((post: Post) => {
                    // format date & time
                    const removedTZ = post.created_at.split(".");
                    const formattedDate = removedTZ[0].split("T");
                    const time = formattedDate[1];
                    const date = formattedDate[0];
                    const link = "/profile/" + post.authorId;
                    let avatarLink = "https://xojkgyryuzebqbbahcbh.supabase.co/storage/v1/object/public/avatars/" + post.authorId

                    return (
                        <Card className = "w-9/10 mb-5 mt-5 gap-4" key = {post.id}>
                            <CardHeader className="flex">
                                <a href={link}>
                                    <Avatar className="w-[35px] h-[35px] border-solid border-slate-900 border-[2px]">
                                        <AvatarImage src={avatarLink}></AvatarImage>
                                        <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                                    </Avatar>
                                </a>
                                {post.url ? (<img className="w-full h-auto object-fit" src={post.url}/>) : null}
                                <a href={link}>
                                    <CardTitle className="m-2">
                                        {post.author.username}
                                    </CardTitle>
                                </a>
                                <div className="flex w-1/1 justify-end">
                                    <CardContent className="text-xs m-2 justify-self-end">@{time} on {date}</CardContent>
                                </div>
                            </CardHeader>
                            <CardContent>{post.content}</CardContent>
                            <div className="flex w-[4/10] pl-[24px] gap-2">
                                <LikeButton userID={userID} postID={post.id}/>
                                <MessageSquare className="hover:cursor-pointer hover:opacity-40"/>
                                <Forward className="hover:cursor-pointer hover:opacity-40"/>
                            </div>
                            <LikedByText postID={post.id}/>
                            <CommentAccordion userID={userID} postID={post.id}/>
                        </Card>
                        )
                    })
                }
            </div>
    )}
    else return (
        <div>
            <div className="flex justify-center bg-slate-100 p-8 mt-2 rounded-lg">
                <div className="text-lg">No posts yet.</div>
            </div>
        </div>
    )
}