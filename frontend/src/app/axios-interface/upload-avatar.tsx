import axios from "axios";

export default async function uploadAvatar(e: any, userID: number) {
    const formData = new FormData(e.target);
    const userIDString = userID.toString();
    try {
        const data = await axios.post(`http://localhost:4000/api/avatar/${userIDString}`, formData);
        console.log("Success: ", data);
    } catch(err) {
        console.log(err)
    }
    return
}
