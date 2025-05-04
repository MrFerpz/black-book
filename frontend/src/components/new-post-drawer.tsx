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

  export default function NewPostDrawer() {
    const [content, setContent] = useState("");

    function postChange(e: any) {
        setContent(e.target.value)
    }

    async function submitPost() {
        try {
            await axios.post("http://localhost:4000/api/posts", {
                content: content 
            });
            console.log("Successfully added post.")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Drawer>
            <DrawerTrigger className="w-30 border-3 border-gray-300 border rounded-md bg-blue-300">New Post</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>New post</DrawerTitle>
                    <DrawerDescription>Write a new post below</DrawerDescription>
                </DrawerHeader>
                <Textarea className="ml-5 w-[97.5%]" onChange={postChange} id="post"/>
                <DrawerFooter>
                    <Button className="hover:cursor-pointer" onClick={submitPost}>Submit</Button>
                    <DrawerClose>
                        <div>Close</div>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        )
    }