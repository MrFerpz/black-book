import axios from "axios";
import { SimpleUser } from "../interfaces/interfaces";

interface UserList {
    following: SimpleUser[],
    notFollowing: SimpleUser[]
}

export async function getFollowing(currentUser: number): Promise<UserList> {
    try {
    const followingData = await axios.get(`http://localhost:4000/api/${currentUser}/following`, {withCredentials: true});
    const following = followingData.data;
    const notFollowingData = await axios.get(`http://localhost:4000/api/${currentUser}/notfollowing`, {withCredentials: true});
    const notFollowing = notFollowingData.data;
    const users: UserList = {
        following: following.following,
        notFollowing: notFollowing
    }
    return users;
    } catch(err) {
        return {following: [], notFollowing: []}
    }
}