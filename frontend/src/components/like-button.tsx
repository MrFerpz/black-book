"use client"
import axios from "axios"
import { Heart, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

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
            const response = await axios.get(`http://localhost:4000/api/${postID}/${userID}/liked`);
            return response.data
        } catch(err) {
            console.log(err);
            return false
        }
    }

    useEffect(() => {
        const fetchLikeStatus = async () => {
            const isLiked = await checkIfLiked(postID, userID);
            setLiked(isLiked);
        };
        fetchLikeStatus()}, []);

    async function likePost(postID: number, userID: number) {
        setIsLoading(true);
        try {
            await axios.post(`http://localhost:4000/api/${postID}/likes`, 
            {
                userID: userID
            });
            setLiked(true);
        }
        catch(err) {
                console.log(err);
                setIsLoading(false);
            }
        router.refresh();
        setTimeout(() => {setIsLoading(false); toast("Liked post.")}, 3500)
    }

    async function unlikePost(postID: number, userID: number) {
        setIsLoading(true);
        try {
        await axios.put(`http://localhost:4000/api/${postID}/likes`, {
            userID: userID
        });
        setLiked(false);
        } catch(err) {
            console.log(err);
            setIsLoading(false)
        }
        router.refresh();
        setTimeout(() => {setIsLoading(false); toast("Unliked post.")}, 3600);
    }

    if (isLoading) {
        return <Loader className="animate-spin" />;
    }

    return (
        <Heart
            className={`hover:cursor-pointer hover:opacity-40 ${liked ? "fill-red-500 text-red-500" : ""}`}
            onClick={() => liked ? unlikePost(postID, userID) : likePost(postID, userID)}>
        </Heart>
    );
}