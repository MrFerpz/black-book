import axios from "axios";

export async function getLikes(postID: Number) {
    const likesData = await axios.get(`http://localhost:4000/api/${postID}/likes`, 
        {withCredentials: true});
    return likesData.data
}