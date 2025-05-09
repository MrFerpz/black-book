"use client"
interface Props {
    userID: number
}
import { useState } from "react"
import uploadPhotoPost from "@/app/axios-interface/upload-photo-post"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { toast } from "sonner"

export default function NewPostDialog({userID}: Props) {
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function toggleOpen() {
        setIsOpen(!isOpen)
    }

    async function submitPost(e: any) {
        setIsLoading(true);
        await uploadPhotoPost(e, userID);
        router.refresh();
        setTimeout(() => {
            setIsLoading(false); 
            setIsOpen(false)
            toast("New post added.")}, 3500)
        }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="hover:cursor-pointer" onClick={toggleOpen} asChild>
                <Button variant="outline">New Post</Button>
            </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Post</DialogTitle>
                    </DialogHeader>
        <div className="grid gap-4 py-4">
            { isLoading ? <div className="flex justify-center"><Loader className="animate-spin"/></div> : 
        <form encType="multipart/form-data" onSubmit={submitPost}>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                Your post
                </Label>
                <Textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Your post content..." className="col-span-3" />
            </div>
            <div className="mt-3 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photopost" className="text-right">
                Photo <br></br> (optional)
                </Label>
                <Input name="photopost" accept="image/png, image/jpeg" type="file" className="col-span-3" />
            </div>
            <div className="mt-3 flex justify-center">
                <Button className="hover:cursor-pointer hover:bg-slate-800" type="submit">Submit post</Button>
            </div>
            </form>}
          </div>
      </DialogContent>
    </Dialog>
  )
}