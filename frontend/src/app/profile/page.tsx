import FriendsPane from "@/components/friends-pane"
import ProfileCard from "@/components/profile-card"
import { cookies } from "next/headers";
import axios from "axios";

interface User {
    id: Number,
    username: string,
    bio: string
}

export default async function ProfilePage() {

    async function getUserAndPosts(): Promise<User> {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");

        try {
            const res = await axios.get("http://localhost:4000/api/user/posts", {
                headers: {
                    Cookie: token ? `token=${token.value}` : "",
                }
            });
            const user = res.data
            console.log(user)
            return user;
        } catch(err) {
            console.log(err);
            return {username: "", id: 0, bio: ""}
        }
    }

    const user = await getUserAndPosts();

return (
    <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
        <div>
            <ProfileCard username={user.username} bio={user.bio}/>
        </div>
        <FriendsPane/>
    </div>
)
}