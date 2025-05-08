import ProfileCard from "@/components/profile-card";
import PostMap from "@/components/postmap";
import FollowingPane from "@/components/following-pane";
import { getProfileWithUser } from "@/app/axios-interface/get-profile-with-user";

type Props = {
    params: {
        userid: string
    }
}

export default async function UserProfile({ params }: any) {

    // extract params for use in finding the profile's data
    const paramsData = await params;
    const userid = paramsData.userid;

const data = await getProfileWithUser(userid);
const posts = data.profileData.authoredPosts;

// the profile's key data
const user = {
    username: data.profileData.username,
    bio: data.profileData.bio,
    id: data.profileData.id,
    followedBy: data.profileData.followedBy,
    following: data.profileData.following,
    authoredPosts: data.profileData.authoredPosts
}

// so we know who the author is on their posts, comments, etc
const currentUserID = data.currentUserID

return (
        <div className="grid h-full grid-rows-1 grid-cols-[1fr_auto]">
            <div>
                <ProfileCard user={user} currentUserID={currentUserID}/>
                <PostMap posts={posts} userID={currentUserID}/>
            </div>
            <FollowingPane currentUserID={currentUserID}/>
        </div>
    )
}