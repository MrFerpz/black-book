import axios from 'axios'
import { useState } from 'react'

export default function signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function updateUsername(e: any) {
        setUsername(e.target.value)
    }

    function updatePassword(e: any) {
        setPassword(e.target.value)
    }

    async function signup(e: any) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:4000/api/signup", {
                username: username,
                password: password
            })
         } catch(err) {
                console.log(err)
            }
        }

    return (
        <>
        <form onSubmit={signup}>
            <label htmlFor="username">Username</label>
            <input onChange={updateUsername} name="username"></input>
            <label htmlFor="password">Password</label>
            <input onChange={updatePassword} name="password" type="password"></input>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}