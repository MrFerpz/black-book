import Image from 'next/image'
import Logo from "../../../public/bbLogoCropped.png"
import { Separator } from "@/components/ui/separator"
import NewPostDrawer from "../../components/new-post-drawer"
import FollowingPane from "@/components/following-pane"
import PostMap from "@/components/postmap"
import { getCurrentUser } from "../data-fetching/get-current-user"
import { getPosts } from "../data-fetching/get-posts"

export default async function HomePage() {
    const posts = await getPosts();
    const user = await getCurrentUser();

    if (posts)
    return (
            <div className="grid grid-rows-1 grid-cols-[1fr_auto]">
                <div className="w-full flex justify-center">
                    <div className="w-[90%] h-full flex flex-col justify-center items-center p-8">
                        <div className="h-[20px]"/>
                        <Image style={{height: "auto"}} width={300} priority={true} alt="Black Book Logo" src={Logo}></Image>
                        <Separator className="w-[90%] my-4"/>
                        <div className="text-xl h-[35px]">What's cookin', <b>{user.username}</b>?</div>
                            <NewPostDrawer/>
                        <Separator className="my-4"/>
                        <PostMap userID={user.id} posts={posts}/>
                    </div>
                </div>
                <FollowingPane currentUserID={user.id}/>
        </div>
    )

    else return (
        <div>No posts are available yet.</div>
    )
}