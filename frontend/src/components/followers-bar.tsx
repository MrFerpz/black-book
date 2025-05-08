import { SimpleUser } from "@/app/interfaces/interfaces"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"

interface Props {
    followedBy: SimpleUser[],
    following: SimpleUser[]
}

export default function FollowersBar({followedBy, following}: Props) {

    return (
        <div className="flex">
            <Dialog>
                <DialogTrigger asChild>
                <Button className="hover:cursor-pointer mr-2" variant="outline"><b>{followedBy.length}</b> Followers</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Followers</DialogTitle>
                    <DialogDescription>
                        See followers
                    </DialogDescription>
                    {followedBy.map(followingUser => {
                        let link = "/profile/" + followingUser.id;
                        return (
                        <div key={followingUser.id.toString()} className="mt-5">
                            <div className="flex gap-4 items-center">
                                <a href={link}>
                                    <Avatar>
                                        <AvatarFallback>{followingUser.username[0]}</AvatarFallback>
                                    </Avatar>
                                </a>
                                <a href={link}>
                                    <div key={followingUser.id.toString()}>
                                        <div className="hover:opacity-40 hover:cursor-pointer">{followingUser.username}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        )}
                    )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                <Button className="hover:cursor-pointer" variant="outline"><b>{following.length}</b> Following</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Following</DialogTitle>
                        <DialogDescription>
                            See following
                        </DialogDescription>
                    </DialogHeader>
                    {following.map(followedUser => {
                        let link = "/profile/" + followedUser.id;
                        return (
                        <div key={followedUser.id.toString()} className="mt-5">
                            <div className="flex gap-4 items-center">
                                <a href={link}>
                                    <Avatar>
                                        <AvatarFallback>{followedUser.username[0]}</AvatarFallback>
                                    </Avatar>
                                </a>
                                <a href={link}>
                                    <div key={followedUser.id.toString()}>
                                        <div className="hover:opacity-40 hover:cursor-pointer">{followedUser.username}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        )}
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}