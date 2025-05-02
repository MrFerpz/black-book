import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function updateUsername(e: any) {
    setUsername(e.target.value)
  }

  function updatePass(e: any) {
    setPassword(e.target.value)
  }

async function signup(e: any) {
  e.preventDefault();
  try {
    await axios.post("http://localhost:4000/api/signup", {
      username: username,
      password: password
  })
  console.log("signed up")
  router.push("/login");
  } catch(err) {
    console.log(err)
  }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Signup for an account</CardTitle>
          <CardDescription>
            Enter your email and password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="JohnDoe420"
                  required
                  onChange={updateUsername}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                onChange={updatePass} 
                id="password" 
                type="password"
                placeholder="********"
                required/>
              </div>
              <div className="flex flex-col gap-3">
                <Button className="hover:bg-blue-500 hover:text-white hover:cursor-pointer w-full" type="submit">
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
