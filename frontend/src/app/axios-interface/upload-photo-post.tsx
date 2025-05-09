import axios from "axios";

export default async function uploadPhotoPost(e: any, userID: number) {
    const formData = new FormData(e.target);
    const photoFile = formData.get("photopost");
    const content = formData.get("content");

    console.log(photoFile);

    if (photoFile && (photoFile as File).size <= 1) {
        try {
            await axios.post("http://localhost:4000/api/posts", {
                content: content,
                userID: userID
            }, { withCredentials: true});
        } catch(err) {
            console.log(err)
        }}

    // Otherwise there's a photo:
    else
    try {
        const data = await axios.post(`http://localhost:4000/api/posts/photo/${userID}`, formData);
        console.log("Success: ", data);
    } catch(err) {
        console.log(err)
    }
    return
}
