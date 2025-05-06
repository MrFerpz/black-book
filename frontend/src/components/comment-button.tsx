"use client"
import axios from "axios";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { SendHorizontal, CircleX, MessageSquare } from "lucide-react";

interface Props {
    postID: Number,
    userID: Number
}

export default function CommentButton({postID, userID}: Props) {
    const [formVisible, setFormVisible] = useState(false);
    const [content, setContent] = useState("")
    const router = useRouter();

    function toggleVisibility() {
        if (formVisible) {
            setFormVisible(false)
        } else {
            setFormVisible(true)
        }
    }

    function contentChange(e: any) {
        setContent(e.target.value)
    }

    async function submitComment(e: any) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4000/api/post/${postID}/comment`, {
            content: content,
            userID: userID
        }, { withCredentials: true });
            setContent("")
            router.refresh();
        }
        catch (err) {
            console.log(err)
        }
    }

    if (formVisible) {
        return (
            <>
                <div className="bg-slate-100 rounded-lg p-1 m-1">
                    <form onSubmit={submitComment} className="flex">
                        <Textarea value={content} placeholder="Add your comment here"autoFocus className="bg-white-900" onChange={contentChange}/>
                        <div className="flex flex-col gap-2 p-1 m-1">
                            <button type="submit"><SendHorizontal className="hover:opacity-40 hover:cursor-pointer">Send</SendHorizontal></button>
                            <CircleX className="hover:opacity-40 hover:cursor-pointer" onClick={toggleVisibility}>Close</CircleX>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    return (
        <>
        <div onClick={toggleVisibility} className="flex gap-3 bg-slate-100 rounded-lg p-3 hover:cursor-pointer hover:opacity-40">
            <MessageSquare/>
            <div>Add comment</div>
        </div>
        </>
    )
}