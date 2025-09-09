import useLoginForm from '../hooks/useLoginForm'
const LoginForm = ({ onLogin }) => {
    const {
        password,
        username,
        changePassword,
        changeUsername
    } = useLoginForm()

    const login = (e) => {
        e.preventDefault()
        onLogin(username, password)
        changePassword('')
        changeUsername('')
    }

    return(
        <div>
            <form onSubmit={login}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        data-testid="username-input"
                        id='username'
                        placeholder='username'
                        type="text"
                        name="username"
                        value={username}
                        onChange={({ target }) => changeUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        data-testid="password-input"
                        id='password'
                        placeholder='password'
                        type="password"
                        name="password"
                        value={password}
                        onChange={({ target }) => changePassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm