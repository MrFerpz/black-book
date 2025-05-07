import FriendsPane from "@/components/friends-pane"
import ProfileCard from "@/components/profile-card"
import { cookies } from "next/headers";
import axios from "axios";
import PostMap from "@/components/postmap";

interface User {
    id: number,
    username: string,
    bio: string,
    authoredPosts: Post[]
}

interface Post {
    id: number,
    authorID: number,
    created_at: string,
    content: string,
    author: User
}

export default async function ProfilePage() {

    // define axios functions for accessing user and their posts
    async function getUserPosts(): Promise<Post[]> {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");
        try {
            const res = await axios.get("http://localhost:4000/api/user/posts", {
                headers: {
                    Cookie: token ? `token=${token.value}` : "",
                }
            });
            const posts = res.data
            return posts;
        } catch(err) {
            console.log(err);
            return []
        }
    }

    async function getUser(): Promise<User> {
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
            return {username: "", id: 0, bio: "", authoredPosts: []}
        }
    }

    // run functions
    const posts = await getUserPosts();
    const user = await getUser();

return (
    <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
        <div>
            <ProfileCard username={user.username} bio={user.bio}/>
            <PostMap posts={posts} user={user}/>
        </div>
        <FriendsPane/>
    </div>
)
}