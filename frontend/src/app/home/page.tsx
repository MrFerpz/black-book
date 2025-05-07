import axios from "axios"
import Image from 'next/image'
import Logo from "../../../public/bbLogoCropped.png"
import { Separator } from "@/components/ui/separator"
import NewPostDrawer from "../../components/new-post-drawer"
import { cookies } from "next/headers"
import FriendsPane from "@/components/friends-pane"
import PostMap from "@/components/postmap"
import { User, Post, SimpleUser } from "../interfaces/interfaces"

async function getPosts(): Promise<Post[]> {
    try {
        const res = await axios.get("http://localhost:4000/api/posts", { withCredentials: true })
        const posts = res.data;
        return posts
    } catch(err) {
        console.log(err);
        return [];
    }
}

async function getUser(): Promise<SimpleUser> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");
        const res = await axios.get("http://localhost:4000/api/user", {
            headers: {
                Cookie: token ? `token=${token.value}` : "",
            }
        });
        const user = res.data
        return user;
    } catch(err) {
        console.log(err);
        return {username: "", id: 0}
    }
}

export default async function HomePage() {
    const posts = await getPosts();
    const user = await getUser();

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
                <FriendsPane/>
        </div>
    )

    else return (
        <div>No posts are available yet.</div>
    )
}