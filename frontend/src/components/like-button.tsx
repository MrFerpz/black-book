"use client"
import axios from "axios"
import { ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
    postID: Number,
    userID: Number
}

export default function LikeButton({postID, userID}: Props) {
    const router = useRouter();

    async function likePost(postID: Number, userID: Number) {
        await axios.post(`http://localhost:4000/api/${postID}/likes`, {
            userID: userID
        });
        router.refresh();
    }

    return (
        <ThumbsUp
            className="hover:cursor-pointer hover:opacity-40"
            onClick={() => {likePost(postID, userID)}}>
        </ThumbsUp>
    )
}