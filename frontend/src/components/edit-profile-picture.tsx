"use client"
import uploadAvatar from "@/app/axios-interface/upload-avatar";
import { PencilRuler } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { useState } from "react";


interface Props {
    currentUserID: number
}

export default function EditProfilePicture({currentUserID}: Props) {
    const [isUploading, setIsUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setIsUploading(true);

        try {
            await uploadAvatar(e, currentUserID);
            setIsOpen(false);
            window.location.href = window.location.href
        } catch(err) {
            console.log(err)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><PencilRuler size={50}  color={'black'} className="hover:cursor-pointer relative top-[250px]" onClick={() => setIsOpen(true)}/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit your profile picture</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex gap-5">
                        <div className="hover:cursor-pointer rounded-md bg-slate-100">
                        <input accept="image/png, image/jpeg" type="file" name="avatar"/>
                        </div>
                        <Button 
                            className="hover:cursor-pointer" 
                            type="submit"
                            disabled={isUploading}>
                            { isUploading ? "Uploading..." : "Submit" }
                            </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        </>
    )
}