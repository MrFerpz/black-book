"use client"
import axios from "axios";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";

interface Props {
    postID: Number
}

export default function CommentButton({postID}: Props) {
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

    async function submitComment() {
        try {
            await axios.post(`http://localhost:4000/api/post/${postID}/comment`, {
            content: content
        }, {withCredentials: true});
            router.refresh();
        }
        catch (err) {
            console.log(err)
        }
    }

    if (formVisible) {
        return (
            <>
                <div className="bg-slate-100 rounded-lg p-3 m-3">
                    <form onSubmit={submitComment} className="flex">
                        <Textarea autoFocus className="bg-white-900" onChange={contentChange}/>
                        <SendHorizontal className=":hover-opacity-0.4" type="submit">Send</SendHorizontal>
                    </form>
                    <Button onClick={toggleVisibility}>Close</Button>
                </div>
            </>
        )
    }

    return (
        <>
        <div className="bg-slate-100 rounded-lg p-3 m-3">
            <Button onClick={toggleVisibility}>Post comment</Button>
        </div>
        </>
    )
}