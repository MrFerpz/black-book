import axios from "axios";

interface Props {
    currentUserID: number,
    userID: number
}

export async function unfollow(currentUserID: number, userID: number) {
    await axios.put(`http://localhost:4000/api/unfollow/${userID}/from/${currentUserID}`);
}

export async function follow(currentUserID: number, userID: number) {
    await axios.put(`http://localhost:4000/api/follow/${userID}/from/${currentUserID}`);
}