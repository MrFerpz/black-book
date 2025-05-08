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

interface Props {
    currentUserID: number
}

export default function EditProfilePicture({currentUserID}: Props) {

    async function handleSubmit(e: any) {
        e.preventDefault();
        await uploadAvatar(e, currentUserID);
        console.log("done");
    }

    return (
        <>
        <Dialog>
            <DialogTrigger><PencilRuler size={40}  color={'#51526c'} className="hover:cursor-pointer relative right-[70px] top-[90px]"/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit your profile picture</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex gap-5">
                        <div className="hover:cursor-pointer rounded-md bg-slate-100">
                        <input accept="image/png, image/jpeg" type="file" name="avatar"/>
                        </div>
                        <Button className="hover:cursor-pointer" type="submit">Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        </>
    )
}