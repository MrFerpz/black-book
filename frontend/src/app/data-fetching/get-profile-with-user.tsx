import axios from "axios";
import { cookies } from "next/headers";
import { ProfileDataWithCurrentUser } from "../interfaces/interfaces";

export async function getProfileWithUser(userid: any): Promise<ProfileDataWithCurrentUser> {
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