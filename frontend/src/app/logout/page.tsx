import { Card } from "@/components/ui/card";
import axios from "axios";

export default async function LogoutPage() {

    async function logout() {
        try {
            await axios.get("http://localhost:4000/api/logout");
        } catch(err) {
            console.log(err)
        }
    }
    
    await logout();

return (
    <div className="flex w-full h-full justify-center items-center">
        <Card className="p-7">
            <div className="text-center">Thanks for coming by!</div>
            <div className="text-center">Login again <a className="text-blue-600" href="/login">here</a>.</div>
        </Card>
    </div>
    )
}