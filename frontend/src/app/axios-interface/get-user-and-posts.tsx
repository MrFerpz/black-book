import axios from "axios";
import { cookies } from "next/headers";
import { ProfileData } from "../interfaces/interfaces";

export async function getUserAndPosts(): Promise<ProfileData> {
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