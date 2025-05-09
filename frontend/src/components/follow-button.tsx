"use client"
import { User } from "@/app/interfaces/interfaces"
import { useState } from "react"
import { follow, unfollow } from "@/app/axios-interface/follow"
import { Button, buttonVariants } from "./ui/button"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"

interface Props {
    user: User,
    currentUserID: number,
    isFollowing: boolean
}

export function FollowButton({user, currentUserID, isFollowing}: Props) {
    const [following, setFollowing] = useState(isFollowing);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleClick() {
        if (following) {
            setFollowing(false);
            setIsLoading(true);
            await unfollow(currentUserID, user.id);
            setIsLoading(false);
            router.refresh();
        } else {
            setFollowing(true);
            setIsLoading(true);
            await follow(currentUserID, user.id);
            setIsLoading(false)
            router.refresh();
        }
    }

    if (user.id === currentUserID) {
        return null
    }

    if (following) {
        return (
            <Button className="hover:cursor-pointer" variant="destructive" onClick={handleClick}>{isLoading ? (<Loader className="animate-spin"/>) : "Unfollow"}</Button>
        )
    }

    return (
        <Button className="hover:cursor-pointer" onClick={handleClick}>{isLoading ? (<Loader className="animate-spin"/>) : "Follow"}</Button>
    )
}