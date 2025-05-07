import FriendsPane from "@/components/friends-pane"
import Image from "next/image"


export default function ProfilePage() {

return (
    <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
        <div></div>
        <FriendsPane/>
    </div>
)
}