import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import axios from "axios"

interface Props {
    postID: Number
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

export default async function CommentAccordion({postID}: Props) {

    async function getComments(postID: Number) {
        const commentsData = await axios.get(`http://localhost:4000/api/${postID}/comments`, {
            withCredentials: true
        });
        const comments = commentsData.data;
        return comments
    }

    const comments = await getComments(postID);

if (comments)
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="comments">
                <AccordionTrigger>See comments</AccordionTrigger>
                    {comments.map((comment: Comment) => (
                            <AccordionContent>{comment.content}</AccordionContent>
                        ))
                    }
            </AccordionItem>
      </Accordion>
    )
}