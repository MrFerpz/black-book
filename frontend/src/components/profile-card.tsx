import { Card } from "./ui/card"
import Image from "next/image"
import axios from "axios"
import DefaultPP from "../../public/defaultPP.jpg"
import { cookies } from "next/headers"
import { Separator } from "@radix-ui/react-separator"

interface Props {
    username: string,
    bio: string
}

export default async function ProfileCard({username, bio}: Props) {

    return (
        <Card className="bg-slate-200 rounded-tl-[0] rounded-tr-[0]">
            <div className="flex">
                <Image priority={true} width={300} height={300} className="rounded-[50%]" alt="Profile Picture" src={DefaultPP}/>
                <div>{username}</div>
                <div>{bio}</div>
            </div>
        </Card>
    )
}