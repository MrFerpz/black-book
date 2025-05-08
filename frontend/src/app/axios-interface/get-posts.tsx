import axios from "axios";
import { Post } from "../interfaces/interfaces";

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await axios.get("http://localhost:4000/api/posts", { withCredentials: true })
        const posts = res.data;
        return posts
    } catch(err) {
        console.log(err);
        return [];
    }
}