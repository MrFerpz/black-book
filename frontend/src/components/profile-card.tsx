import { Card } from "./ui/card"
import Image from "next/image"
import DefaultPP from "../../public/defaultPP.jpg"
import BioButton from "./bio-button"
import { User, SimpleUser } from "@/app/interfaces/interfaces"
import FollowersBar from "./followers-bar"
import FollowButtonWrapper from "./follow-button-wrapper"
import EditProfilePicture from "./edit-profile-picture"
import { getProfilePicURL } from "@/app/axios-interface/get-profile-pic"

interface Props {
    user: User,
    currentUserID: number
}

export default async function ProfileCard({user, currentUserID}: Props) {
    const timestamp = Date.now();
    let ppUrl = await getProfilePicURL(currentUserID);
    const imageUrl = ppUrl ? `${ppUrl}?t=${timestamp}` : "../../public/defaultPP.jpg";

    

    return (
        <Card className="bg-slate-200 rounded-tl-[0] rounded-tr-[0]">
            <div className="flex">
                <img
                    className="rounded-[50%] ml-10 w-[300px] h-[300px] object-cover" 
                    alt="Profile Picture" 
                    src={imageUrl}
                />
                <EditProfilePicture currentUserID={currentUserID}/>
                <div className="flex w-full flex-col justify-center p-6 ml-10">
                    <div className="text-2xl font-extrabold">{user.username}</div>
                    <div className="my-4 h-[2px] bg-slate-400"/>
                    {user.bio ? (
                        <div className="bg-white p-6 rounded-md">{user.bio}</div>
                    ) : (
                        <div>{user.username} does not have a bio yet.</div>
                    )}
                    <div className="my-4 h-[2px] bg-slate-400"/>
                    <BioButton userID={user.id} currentUserID={currentUserID}/>
                    <div className="flex mt-7 gap-4 justify-center items-center h-full">
                        <FollowersBar followedBy={user.followedBy} following={user.following}/>
                        <FollowButtonWrapper user={user} currentUserID={currentUserID}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}