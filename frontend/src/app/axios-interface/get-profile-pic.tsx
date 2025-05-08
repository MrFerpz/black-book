import axios from "axios";

export async function getProfilePicURL(userID: number) {
        const IDString = userID.toString();
        const urlData = await axios.get(`http://localhost:4000/api/profilepic/${IDString}`);
        const url = urlData.data;
    return url
}