import { Card } from "./ui/card"
import Image from "next/image"
import axios from "axios"
import DefaultPP from "../../public/defaultPP.jpg"
import { cookies } from "next/headers"
import { Separator } from "@radix-ui/react-separator"
import BioButton from "./bio-button"

interface Props {
    userID: number,
    username: string,
    bio: string
}

export default async function ProfileCard({userID, username, bio}: Props) {
    console.log(bio)

    return (
        <Card className="bg-slate-200 rounded-tl-[0] rounded-tr-[0]">
            <div className="flex">
                <Image priority={true} width={300} height={300} className="rounded-[50%]" alt="Profile Picture" src={DefaultPP}/>
                <div className="flex w-full flex-col justify-center p-6 ml-10">
                    <div className="text-2xl font-extrabold">{username}</div>
                    <Separator className="my-4 bg-slate-900"/>
                    <div>{bio}</div>
                    <BioButton userID={userID}/>
                </div>
            </div>
        </Card>
    )
}