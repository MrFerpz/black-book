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
            <div className="font-bold text-center">Currently following</div>
            <div className="w-full h-[1px] bg-slate-300"></div>
                {following.map((user: SimpleUser) => {
                    let path = user.id.toString();
                    let link = `/profile/${path}`;
                    return (
                    <a href={link} key={user.id.toString()}>
                        <div className="flex ml-2 mr-2 p-3 items-center rounded-lg bg-slate-200 gap-1">
                            <div className="ml-1 bg-green-600 rounded-[50%] w-[10px] h-[10px]"></div>
                            <div className="mr-5 ml-1 w-[40px] h-[40px] text-center font-bold rounded-[50%] bg-white p-2">{user.username[0]}</div>
                            <div>{user.username}</div>
                        </div>
                    </a>
                    );
                })}
            <div className="w-full h-[1px] bg-slate-400"></div>
            <div className="font-bold text-center">Other users</div>
            <div className="w-full h-[1px] bg-slate-300"></div>
            {notFollowing.map((user: SimpleUser) => {
                    let path = user.id.toString();
                    let link = `/profile/${path}`;
                    return (
                    <a href={link} key={user.id.toString()}>
                        <div className="flex ml-2 mr-2 p-3 items-center rounded-lg bg-slate-200 gap-1">
                            <div className="ml-1 bg-slate-600 rounded-[50%] w-[10px] h-[10px]"></div>
                            <div className="mr-5 ml-1 w-[40px] h-[40px] text-center font-bold rounded-[50%] bg-white p-2">{user.username[0]}</div>
                            <div>{user.username}</div>
                        </div>
                    </a>
                    );
                })}
        </div>
    )
}