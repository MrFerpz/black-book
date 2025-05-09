"use client"
interface Props {
    userID: number
}
import { useState } from "react"
import uploadPhotoPost from "@/app/axios-interface/upload-photo-post"
import { Button } from "@/components/ui/button"
import {
  Dialog,
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

export default function NewPostDialog({userID}: Props) {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">New Post</Button>
            </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>New Post</DialogTitle>
            </DialogHeader>
        <div className="grid gap-4 py-4">
        <form encType="multipart/form-data" onSubmit={(e) => uploadPhotoPost(e, userID)}>
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
                <Button type="submit">Submit post</Button>
            </div>
            </form>
          </div>
      </DialogContent>
    </Dialog>
  )
}