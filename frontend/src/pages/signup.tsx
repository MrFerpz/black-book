export default function signup() {
    return (
        <form>
            <label htmlFor="username">Username</label>
            <input name="username"></input>
            <label htmlFor="password">Password</label>
            <input name="password" type="password"></input>
            <a href="/">Home</a>
        </form>
    )
}