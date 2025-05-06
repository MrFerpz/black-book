import { Separator } from "./ui/separator"

export default function FriendsPane() {
    return (
        <div className="flex flex-col items-center gap-2 bg-accent h-full w-[200px]">
            <div className="h-[20px]"/>
            <div>Friend 1</div>
            <Separator/>
            <div>Friend 2</div>
            <Separator/>
            <div>Friend 3</div>
            <Separator/>
            <div>Friend 4</div>
        </div>
    )
}