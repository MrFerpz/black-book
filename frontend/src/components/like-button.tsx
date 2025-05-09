"use client"
import axios from "axios"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useEffect } from "react";

interface Props {
    postID: number,
    userID: number,
}


export default function LikeButton({postID, userID}: Props) {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function checkIfLiked(postID: number, userID: number) {
        try {
            const response = await axios.get(`http://localhost:4000/${postID}/${userID}/liked`);
            return response.data
        } catch(err) {
            console.log(err);
            return false
        }
    }

    useEffect(() => {
        const fetchLikeStatus = async () => {
            setIsLoading(true);
            const isLiked = await checkIfLiked(postID, userID);
            setLiked(isLiked);
            setIsLoading(false);
        };
        fetchLikeStatus()}, [postID, userID]);

    async function likePost(postID: number, userID: number) {
        try {
            await axios.post(`http://localhost:4000/api/${postID}/likes`, 
            {
                userID: userID
            });
            setLiked(true)
        }
        catch(err) {
                console.log(err)
            }
        router.refresh();
    }

    async function unlikePost(postID: number, userID: number) {
        try {
        await axios.put(`http://localhost:4000/api/${postID}/likes`, {
            userID: userID
        });
        setLiked(false)
        } catch(err) {
            console.log(err)
        }
        router.refresh();
    }

    if (isLoading) {
        return <Heart className="opacity-50" />; // Loading state
    }

    return (
        <Heart
            className={`hover:cursor-pointer hover:opacity-40 ${liked ? "fill-red-500 text-red-500" : ""}`}
            onClick={() => liked ? unlikePost(postID, userID) : likePost(postID, userID)}>
        </Heart>
    );
}