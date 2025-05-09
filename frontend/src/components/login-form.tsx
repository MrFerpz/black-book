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
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // cursor-wait to the entire document body when loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('cursor-wait');
      // adding a class to all elements to ensure cursor-wait is shown everywhere
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.classList.add('cursor-wait');
      });
    } else {
      document.body.classList.remove('cursor-wait');
      // remove the class from all elements when loading finishes
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.classList.remove('cursor-wait');
      });
    }
    
    // clean up function to ensure we remove the class when component unmounts
    return () => {
      document.body.classList.remove('cursor-wait');
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.classList.remove('cursor-wait');
      });
    };
  }, [isLoading]);

  function updateUsername(e: any) {
    setUsername(e.target.value)
  }

  function updatePassword(e: any) {
    setPassword(e.target.value)
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/api/login", {
        username: username,
        password: password
      }, { withCredentials: true });
      setIsLoading(false);
      setIsRedirecting(true);
      router.push("/home")
    } catch(err) {
      console.log(err);
      setIsLoading(false)
    }
  }

  async function loginAsGuest(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/api/login", {
        username: "Guest",
        password: "Guest"
      }, { withCredentials: true });
      router.push("/home");
      setIsLoading(false);
      setIsRedirecting(true);
    } catch(err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  if (!isRedirecting)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="JohnDoe420"
                  required
                  onChange={updateUsername}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  placeholder="********"
                  onChange={updatePassword}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
          <form onSubmit={loginAsGuest}>
            <Button 
              type="submit" 
              variant="secondary" 
              className="mt-3 w-full hover:cursor-pointer hover:bg-slate-300"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Guest Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (isRedirecting) {
    return (
      <Card className="flex justify-content">
        <CardHeader>
          <CardTitle className="text-lg text-center">Welcome back!</CardTitle>
        </CardHeader>
          <CardContent className="text-center">
            Loading the homepage...
            <div className="m-5 w-10 h-10 border-4 border-t-blue-500 border-b-blue-700 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          </CardContent>
      </Card>
    )
  }
}