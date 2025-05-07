import { Card } from "./ui/card"
import Image from "next/image"
import DefaultPP from "../../public/defaultPP.jpg"
import BioButton from "./bio-button"
import { User, SimpleUser } from "@/app/interfaces/interfaces"
import FollowersBar from "./followers-bar"

interface Props {
    user: User
}

export default async function ProfileCard({user}: Props) {

    return (
        <Card className="bg-slate-200 rounded-tl-[0] rounded-tr-[0]">
            <div className="flex">
                <Image priority={true} width={300} height={300} className="rounded-[50%] ml-5" alt="Profile Picture" src={DefaultPP}/>
                <div className="flex w-full flex-col justify-center p-6 ml-10">
                    <div className="text-2xl font-extrabold">{user.username}</div>
                    <div className="my-4 h-[2px] bg-slate-400"/>
                    <div>{user.bio}</div>
                    <div className="my-4 h-[2px] bg-slate-400"/>
                    <BioButton userID={user.id}/>
                    <div className="flex justify-center items-center h-full">
                        <FollowersBar followedBy={user.followedBy} following={user.following}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}