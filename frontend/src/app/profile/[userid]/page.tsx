import axios from "axios";
import { ProfileData } from "@/app/interfaces/interfaces";
import ProfileCard from "@/components/profile-card";
import PostMap from "@/components/postmap";
import FriendsPane from "@/components/friends-pane";

export default async function otherProfile({params}: {params: Promise<{userid: string}>}) {

    const { userid } = await params;
    console.log("userid = ", userid);
    
    async function getData(): Promise<ProfileData> {
        try {
            const userDataAndPosts = await axios.get(`http://localhost:4000/api/user/withposts/${userid}`);
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

// Next up
//
// When interacting with postmap (likes/comments) it will think it's the user who's profile you are on.
// Important to differentiate YOUR user object, and the person who's page you're on
//
// Disable edit bio

return (
    <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
        <div>
            <ProfileCard user={user}/>
            <PostMap posts={posts} user={user}/>
        </div>
        <FriendsPane/>
    </div>
    )
}