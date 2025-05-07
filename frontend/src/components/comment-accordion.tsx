import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Separator } from "./ui/separator"
import axios from "axios"
import CommentButton from "./comment-button"

interface Props {
    postID: Number,
    userID: Number
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
    console.log(comments)

if (comments.length > 0)
    return (
    <>
    <Separator/>
        <Accordion type="single" collapsible className="w-full px-6">
            <AccordionItem value="comments">
                <AccordionTrigger className="hover:cursor-pointer">See comments</AccordionTrigger>
                <Separator/>
                    {comments.map((comment: Comment) => {
                        let link = "/profile/" + comment.author.id.toString();
                        return (
                            <AccordionContent className="bg-slate-100 rounded-lg mt-3 p-3" key={comment.id.toString()}>
                                <a href={link}>
                                    <div className="font-bold">{comment.author.username}</div>
                                </a>
                                <div>{comment.content}</div>
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
                <AccordionTrigger className="hover:cursor-pointer">See comments</AccordionTrigger>
                <Separator/>
                            <AccordionContent className="bg-slate-100 rounded-lg mt-3 p-3">
                                <div className="px-3">No comments yet. Be the first!</div>
                                <CommentButton userID={userID} postID={postID}/>
                            </AccordionContent>
            </AccordionItem>
      </Accordion>
    )
}