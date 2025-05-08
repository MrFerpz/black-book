import { Button, buttonVariants } from "./ui/button"
import { User } from "@/app/interfaces/interfaces"
import { getFollowing } from "@/app/axios-interface/get-following"
import { FollowButton } from "./follow-button"

interface Props {
    user: User,
    currentUserID: number
}

export default async function FollowButtonWrapper({user, currentUserID}: Props) {
    const yourFollowData = await getFollowing(currentUserID);
    const yourFollowingIDs = yourFollowData.following.map(user => user.id)

    return (
        <FollowButton
            user={user}
            currentUserID={currentUserID}
            isFollowing={yourFollowingIDs.includes(user.id)}
        />
    )
}