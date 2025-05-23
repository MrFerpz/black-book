import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Separator } from "./ui/separator"
import axios from "axios"
import CommentButton from "./comment-button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface Props {
    postID: Number,
    userID: Number,
}

interface Comment {
    id: Number,
    created_at: Date,
    content: String,
    author: User,
    post: Post
}

interface User {
    id: Number,
    username: string
}

interface Post {
    id: Number,
    created_at: Date,
    content: string
}

export default async function CommentAccordion({postID, userID}: Props) {

    async function getComments(postID: Number) {
        const commentsData = await axios.get(`http://localhost:4000/api/${postID}/comments`, {
            withCredentials: true
        });
        const comments = commentsData.data;
        return comments
    }

    const comments = await getComments(postID);

if (comments.length > 0)
    return (
    <>
    <Separator/>
        <Accordion type="single" collapsible className="w-full px-6">
            <AccordionItem value="comments">
                <AccordionTrigger className="hover:cursor-pointer">See ({comments.length}) comments</AccordionTrigger>
                <Separator/>
                    {comments.map((comment: Comment) => {
                        let link = "/profile/" + comment.author.id.toString();
                        let avatarLink = "https://xojkgyryuzebqbbahcbh.supabase.co/storage/v1/object/public/avatars/" + comment.author.id;
                        return (
                            <AccordionContent className="bg-slate-100 rounded-lg mt-3 p-3" key={comment.id.toString()}>
                                <div className="flex gap-8 items-center">
                                    <div className="flex flex-col w-[75px] ml-3 justify-center items-center gap-2">
                                        <a href={link}>
                                            <Avatar className="w-[35px] h-[35px] border-solid border-slate-900 border-[2px]">
                                                <AvatarImage src={avatarLink}/>
                                                <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
                                            </Avatar>
                                        </a>
                                        <a href={link}>
                                            <div className="font-bold">{comment.author.username}</div>
                                        </a>
                                    </div>
                                    <div>{comment.content}</div>
                                </div>
                            </AccordionContent>
                            )
                        })
                    }
                    <AccordionContent className="bg-slate-100 rounded-lg mt-3 p-2">
                        <CommentButton userID={userID} postID={postID}/>
                    </AccordionContent>
            </AccordionItem>
      </Accordion>
      </>
    )

    return (
        <Accordion type="single" collapsible className="w-full px-6">
            <AccordionItem value="comments">
                <AccordionTrigger className="hover:cursor-pointer">See (0) comments</AccordionTrigger>
                <Separator/>
                            <AccordionContent className="bg-slate-100 rounded-lg mt-3 p-3">
                                <div className="px-3">No comments yet. Be the first!</div>
                                <CommentButton userID={userID} postID={postID}/>
                            </AccordionContent>
            </AccordionItem>
      </Accordion>
    )
}