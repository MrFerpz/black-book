"use client"
import axios from "axios";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { SquarePen, CircleX, MessageSquare } from "lucide-react";

interface Props {
    userID: number,
    currentUserID: number
}

export default function BioButton({userID, currentUserID}: Props) {
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

    async function updateBio(e: any) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/put/${userID}/bio`, {
            content: content,
            userID: userID
        }, { withCredentials: true });
            setContent("")
            router.refresh();
            toggleVisibility();
        }
        catch (err) {
            console.log(err)
        }
    }

    if (currentUserID !== userID) {
        return
    }

    if (formVisible) {
        return (
            <>
                <div className="bg-slate-100 rounded-lg p-1 m-1">
                    <form onSubmit={updateBio} className="flex">
                        <Textarea value={content} placeholder="Add your bio here"autoFocus className="bg-white-900" onChange={contentChange}/>
                        <div className="flex flex-col gap-2 p-1 m-1">
                            <button type="submit"><SquarePen className="hover:opacity-40 hover:cursor-pointer">Send</SquarePen></button>
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
            <SquarePen/>
            <div>Edit bio</div>
        </div>
        </>
    )
}