"use client"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react"
import { Textarea } from "../components/ui/textarea"
import { Button } from "./ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader } from "lucide-react"

interface Props {
    userID: number
}

export default function NewPostDrawer({userID}: Props) {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    function postChange(e: any) {
        setContent(e.target.value)
    }

    async function submitPost() {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:4000/api/posts", {
                content: content,
                userID: userID
            }, {withCredentials: true});
            router.refresh();
            setTimeout(() => {setIsLoading(false); toast("Successfully added post.")}, 3600);
        } catch(err) {
            console.log(err)
        }
    }

    if (isLoading) {
        return (
            <div className="bg-slate-100 text-secondary-foreground shadow-xs hover:bg-blue-200 mt-3 rounded-md px-6 py-2">
                <Loader className="animate-spin"/>
            </div>
        )
    }
    return (
        <Drawer>
            <DrawerTrigger className="hover:cursor-pointer bg-slate-100 text-secondary-foreground shadow-xs hover:bg-blue-200 mt-3 rounded-md px-6 py-2">New Post</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>New post</DrawerTitle>
                    <DrawerDescription>Write a new post below</DrawerDescription>
                </DrawerHeader>
                <Textarea className="ml-5 w-[97.5%]" onChange={postChange} id="post"/>
                <DrawerFooter>
                    <DrawerClose>
                    <Button className="hover:cursor-pointer" onClick={submitPost}>Submit</Button>
                        <div>Cancel</div>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        )
    }