import axios from "axios";
import { Post } from "../interfaces/interfaces";

export async function getHomePagePosts(userID: number): Promise<Post[]> {
    try {
        const res = await axios.get(`http://localhost:4000/api/homepage/${userID}`, { withCredentials: true })
        const posts = res.data;
        return posts
    } catch(err) {
        console.log(err);
        return [];
    }
}