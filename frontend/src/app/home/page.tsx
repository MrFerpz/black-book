import Image from 'next/image'
import Logo from "../../../public/bbLogoCropped.png"
import { Separator } from "@/components/ui/separator"
import NewPostDrawer from "../../components/new-post-drawer"
import FollowingPane from "@/components/following-pane"
import PostMap from "@/components/postmap"
import { getCurrentUser } from "../axios-interface/get-current-user"
import { getPosts } from "../axios-interface/get-posts"
import NewPostDialog from '@/components/new-post-dialog'
import { getHomePagePosts } from '../axios-interface/get-homepage-posts'

export default async function HomePage() {
    const user = await getCurrentUser();
    const posts = await getHomePagePosts(user.id);

    if (posts) {
        return (
                <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
                    <div className="w-full flex justify-center">
                        <div className="w-[90%] h-full flex flex-col items-center p-8">
                            <div className="h-[20px]"/>
                            <Image style={{height: "auto"}} width={300} priority={true} alt="Black Book Logo" src={Logo}></Image>
                            <Separator className="w-[90%] my-4"/>
                            <div className="text-xl h-[35px]">What's cookin', <b>{user.username}</b>?</div>
                                <NewPostDialog userID={user.id}/>
                                {/* <NewPostDrawer userID={user.id}/> */}
                            <Separator className="my-4"/>
                            <PostMap userID={user.id} posts={posts}/>
                            <div className="text-lg p-6">Follow more users to see more posts!</div>
                        </div>
                    </div>
                    <FollowingPane currentUserID={user.id}/>
                </div>
        )
    }
}