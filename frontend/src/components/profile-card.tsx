import { Card } from "./ui/card"
import Image from "next/image"
import DefaultPP from "../../public/defaultPP.jpg"
import BioButton from "./bio-button"
import { User, SimpleUser } from "@/app/interfaces/interfaces"
import FollowersBar from "./followers-bar"

interface Props {
    user: User,
    currentUserID: number
}

export default async function ProfileCard({user, currentUserID}: Props) {

    return (
        <Card className="bg-slate-200 rounded-tl-[0] rounded-tr-[0]">
            <div className="flex">
                <Image priority={true} style={{width: "256px", height: "256px"}} className="rounded-[50%] ml-5" alt="Profile Picture" src={DefaultPP}/>
                <div className="flex w-full flex-col justify-center p-6 ml-10">
                    <div className="text-2xl font-extrabold">{user.username}</div>
                    <div className="my-4 h-[2px] bg-slate-400"/>
                    {user.bio ? (
                        <div>{user.bio}</div>
                    ) : (
                        <div>{user.username} does not have a bio yet.</div>
                    )}
                    <div className="my-4 h-[2px] bg-slate-400"/>
                    <BioButton userID={user.id} currentUserID={currentUserID}/>
                    <div className="flex mt-7 justify-center items-center h-full">
                        <FollowersBar followedBy={user.followedBy} following={user.following}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}