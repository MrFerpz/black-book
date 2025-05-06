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
    const style = "bg-slate-100 rounded-sm p-1 px-6"

    if (likers.length === 0) {
        return (
            <div className={style}>No likes on this post yet. Be the first!</div>
        )
    }

    if (likers.length === 1) {
        return (
            <div className={style}>Liked by <b>{likers[0].username}</b>.</div>
        )
    }

    if (likers.length === 2) {
        return (
            <div className={style}>Liked by <b>{likers[0].username}</b> and <b>{likers[1].username}</b>.</div>
        )
    }

    if (likers.length === 3) {
        return (
            <div className={style}>Liked by <b>{likers[0].username}</b>, <b>{likers[1].username}</b>, and <b>{likers[2].username}</b>.</div>
        )
    }

    return (
        <div className={style}>Liked by <b>{likers[0].username}</b>, <b>{likers[1].username}</b>, and <b>{likers.length - 2} others</b>.</div>
    )
}