import axios from "axios"

interface Props {
    postID: Number
}

export default async function LikedByText({postID}: Props) {

    async function getLikes(postID: Number) {
        const likesData = await axios.get(`http://localhost:4000/api/${postID}/likes`, 
            {withCredentials: true});

        return likesData.data
    }

    const likers: any = await getLikes(postID);

    if (likers.length === 0) {
        return (
            <div>No likes on this post yet. Be the first!</div>
        )
    }

    if (likers.length === 1) {
        return (
            <div>Liked by {likers[0].username}.</div>
        )
    }

    if (likers.length === 2) {
        return (
            <div>Liked by {likers[0].username} and {likers[1].username}.</div>
        )
    }

    return (
        <div>Liked by {likers[0].username}, {likers[1].username}, and {likers.length - 2} others.</div>
    )
}