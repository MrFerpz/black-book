import FollowingPane from "@/components/following-pane";
import ProfileCard from "@/components/profile-card"
import PostMap from "@/components/postmap";
import { getUserAndPosts } from "../axios-interface/get-user-and-posts";

export default async function ProfilePage() {

    const data = await getUserAndPosts();
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
            <ProfileCard user={user} currentUserID={user.id}/>
            <PostMap posts={posts} userID={user.id}/>
        </div>
        <FollowingPane currentUserID={user.id}/>
    </div>
    )
}