"use client"
import { User } from "@/app/interfaces/interfaces"
import { useState } from "react"
import { follow, unfollow } from "@/app/axios-interface/follow"
import { Button, buttonVariants } from "./ui/button"
import { useRouter } from "next/navigation"

interface Props {
    user: User,
    currentUserID: number,
    isFollowing: boolean
}

export function FollowButton({user, currentUserID, isFollowing}: Props) {
    const [following, setFollowing] = useState(isFollowing);
    const router = useRouter();

    async function handleClick() {
        if (following) {
            setFollowing(false);
            await unfollow(currentUserID, user.id);
            router.refresh();
        } else {
            setFollowing(true);
            await follow(currentUserID, user.id);
            router.refresh();
        }
    }

    if (user.id === currentUserID) {
        return null
    }

    if (following) {
        return (
            <Button className="hover:cursor-pointer" variant="destructive" onClick={handleClick}>Unfollow</Button>
        )
    }

    return (
        <Button className="hover:cursor-pointer" onClick={handleClick}>Follow</Button>
    )
}