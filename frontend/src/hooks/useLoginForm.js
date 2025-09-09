import { useState } from 'react'
const useLoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const changePassword = (p) => {
        setPassword(p)
    }

    const changeUsername = (u) => {
        setUsername(u)
    }

    return{
        username,
        password,
        changePassword,
        changeUsername
    }
}

export default useLoginForm