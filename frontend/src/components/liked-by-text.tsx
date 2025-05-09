import { getLikes } from "@/app/axios-interface/get-likes";

interface Props {
    postID: Number
}

export default async function LikedByText({postID}: Props) {

    const likers: any = await getLikes(postID);
    const style = "rounded-sm p-1 px-6"

    if (likers.length === 0) {
        return (
            <div className={style}>No likes on this post yet</div>
        )
    }

    if (likers.length === 1) {
        let link = "/profile/" + likers[0].id
        return (
            <div className={style}>Liked by <a href={link}><b>{likers[0].username}</b></a></div>
        )
    }

    if (likers.length === 2) {
        let link1 = "/profile/" + likers[0].id;
        let link2 = "/profile/" + likers[1].id;
        return (
            <div className={style}>Liked by <a href={link1}><b>{likers[0].username}</b></a> and <a href={link2}><b>{likers[1].username}</b></a></div>
        )
    }

    if (likers.length === 3) {
        let link1 = "/profile/" + likers[0].id;
        let link2 = "/profile/" + likers[1].id;
        let link3 = "/profile/" + likers[2].id;
        return (
            <div className={style}>Liked by <a href={link1}><b>{likers[0].username}</b></a>, <a href={link2}><b>{likers[1].username}</b></a>, and <a href={link3}><b>{likers[2].username}</b></a></div>
        )
    }

    else if (likers.length > 3) {
        let link1 = "/profile/" + likers[0].id;
        let link2 = "/profile/" + likers[1].id;
    return (
        <div className={style}>Liked by <a href={link1}><b>{likers[0].username}</b></a>, <a href={link2}><b>{likers[1].username}</b></a>, and <b>{likers.length - 2} others</b></div>
        )
    }
}