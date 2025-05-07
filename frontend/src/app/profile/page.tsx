import FriendsPane from "@/components/friends-pane"
import ProfileCard from "@/components/profile-card"
import { cookies } from "next/headers";
import axios from "axios";
import PostMap from "@/components/postmap";

interface Data {
    username: string,
    id: number,
    bio: string,
    followedBy: simpleUser[],
    following: simpleUser[],
    authoredPosts: Post[]
}

interface simpleUser {
    username: string
}

interface Post {
    id: number,
    authorID: number,
    created_at: string,
    content: string,
    author: User
}

interface User {
    id: number,
    username: string,
    bio: string,
    authoredPosts: Post[]
}

export default async function ProfilePage() {

    async function getData(): Promise<Data> {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");
        try {
            const res = await axios.get("http://localhost:4000/api/user", {
                headers: {
                    Cookie: token ? `token=${token.value}` : "",
                }
            });
            const userPayload = res.data;
            const userID = userPayload.id
            const userDataAndPosts = await axios.get(`http://localhost:4000/api/user/withposts/${userID}`);
            return userDataAndPosts.data
        } catch (err) {
            console.log(err);
            return {username: "", id: 0, bio: "", followedBy: [], following: [], authoredPosts: []}
        }
    }

    const data = await getData();
    const posts = data.authoredPosts;
    const user = {
        username: data.username,
        bio: data.bio,
        id: data.id,
        followedBy: data.followedBy,
        following: data.following,
        authoredPosts: data.authoredPosts
    }

return (
    <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
        <div>
            <ProfileCard userID={user.id} username={user.username} bio={user.bio}/>
            <PostMap posts={posts} user={user}/>
        </div>
        <FriendsPane/>
    </div>
)
}