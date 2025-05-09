"use client"
import axios from "axios";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SquarePen, CircleX, MessageSquare, Loader } from "lucide-react";

interface Props {
    userID: number,
    currentUserID: number
}

export default function BioButton({userID, currentUserID}: Props) {
    const [formVisible, setFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:4000/api/put/${userID}/bio`, {
            content: content,
            userID: userID
        }, { withCredentials: true });
            setContent("")
            router.refresh();
            setTimeout(() => setIsLoading(false), 3600);
            toast("Successfully updated bio.");
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
        <div onClick={toggleVisibility} className="flex justify-center gap-3 bg-slate-100 rounded-lg p-3 hover:cursor-pointer hover:opacity-40">
            {isLoading ? <div className="flex justify-center"><Loader className="animate-spin"/></div> : (
                <div className="flex gap-2 justify-space-around">
                    <SquarePen/>
                    <div>Edit Bio</div>
                </div>
            )}
        </div>
    )
}