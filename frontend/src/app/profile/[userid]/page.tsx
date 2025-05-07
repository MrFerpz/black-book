import axios from "axios";
import { ProfileData, ProfileDataWithCurrentUser } from "@/app/interfaces/interfaces";
import ProfileCard from "@/components/profile-card";
import PostMap from "@/components/postmap";
import FriendsPane from "@/components/friends-pane";
import { cookies } from "next/headers";

type Props = {
    params: {
        userid: string
    }
}

export default async function UserProfile({ params }: any) {

    // extract params for use in finding the profile's data
    const paramsData = await params;
    const userid = paramsData.userid;
    
    async function getData(userid: any): Promise<ProfileDataWithCurrentUser> {
        // establish the current user's ID
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");
        try {
            const res = await axios.get("http://localhost:4000/api/user", {
                headers: {
                    Cookie: token ? `token=${token.value}` : "",
                }
            });
            // this is the current user
            const userPayload = res.data;
            const currentUserID = userPayload.id

            // this is the profile page's user
            const userDataAndPosts = await axios.get(`http://localhost:4000/api/user/withposts/${userid}`);
            return { 
                currentUserID: currentUserID, 
                profileData: userDataAndPosts.data
            }
        } catch (err) {
            console.log(err);
            return {
                currentUserID: 0,
                profileData: {
                    username: "", 
                    id: 0, 
                    bio: "", 
                    followedBy: [],
                    following: [], 
                    authoredPosts: []
                }
        }
    }
}

const data = await getData(userid);
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
            <FriendsPane/>
        </div>
    )
}