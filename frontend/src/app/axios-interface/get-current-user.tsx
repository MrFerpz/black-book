import axios from "axios";
import { cookies } from "next/headers";
import { SimpleUser } from "../interfaces/interfaces";

export async function getCurrentUser(): Promise<SimpleUser> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token");
        const res = await axios.get("http://localhost:4000/api/user", {
            headers: {
                Cookie: token ? `token=${token.value}` : "",
            }
        });
        const user = res.data
        return user;
    } catch(err) {
        console.log(err);
        return {username: "", id: 0}
    }
}