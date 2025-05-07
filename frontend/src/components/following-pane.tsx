import { Separator } from "./ui/separator"
import axios from "axios"
import { SimpleUser } from "@/app/interfaces/interfaces";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

type Props = {
    currentUserID: number
}

interface UserList {
    following: SimpleUser[],
    notFollowing: SimpleUser[]
}

export default async function FollowingPane({currentUserID}: Props) {

    async function getFollowing(currentUser: number): Promise<UserList> {
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

    const userList = await getFollowing(currentUserID);
    const following = userList.following;
    const notFollowing = userList.notFollowing;

    return (
        <div className="flex flex-col gap-2 bg-accent h-full w-[250px]">
            <div className="h-[20px]"/>
            <div className="font-bold text-center mb-5">Currently following</div>
                {following.map((user: SimpleUser) => {
                    let link = `/profile/${user.id}`;
                    return (
                    <a href={link} key={user.id.toString()}>
                        <div className="flex gap-6">
                            <Avatar>
                                <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <div>{user.username}</div>
                        </div>
                    </a>
                    );
                })}
                <Separator className="mt-4 mb-4"/>
            <div className="font-bold text-center mb-5">Other users</div>
            {notFollowing.map((user: SimpleUser) => {
                    let link = `/profile/${user.id}`;
                    return (
                    <a href={link} key={user.id.toString()}>
                        <div className="flex gap-6">
                            <div className="mr-5 ml-5 rounded-[50%] bg-white px-3 py-3">{user.username[0]}</div>
                            <div>{user.username}</div>
                        </div>
                    </a>
                    );
                })}
        </div>
    )
}