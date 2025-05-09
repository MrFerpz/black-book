import axios from "axios";

export default async function uploadPhotoPost(e: any, userID: number) {
    const formData = new FormData(e.target);
    // Need to include text content & photo. UserID passed through from homepage.
    try {
        const data = await axios.post(`http://localhost:4000/api/posts/photo/${userID}`, formData);
        console.log("Success: ", data);
    } catch(err) {
        console.log(err)
    }
    return
}
