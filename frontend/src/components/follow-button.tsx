import axios from "axios"
import { Button, buttonVariants } from "./ui/button"
import { User } from "@/app/interfaces/interfaces"
axios

interface Props {
    user: User,
    currentUserID: number
}

export default async function FollowButton({user, currentUserID}: Props) {

    if (user.id === currentUserID) {
        return
    }

    console.log(user.followedBy);
    console.log(user.following);

    return (
        <Button variant="secondary">Follow</Button>
    )
}