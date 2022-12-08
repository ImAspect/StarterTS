import { FormEvent, useState } from "react"
import AuthAPI from "../../api/AuthAPI"
import { Navigate } from 'react-router-dom'

const Forgot = () => {
    const [error, setError] = useState('')
    const [redirectLogin, setRedirectLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [count, setCount] = useState(5)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const res = await AuthAPI.forgot({
            email
        })

        setError(res.msg)

        if (res.status === 200) {
            const count = setInterval(function () {
                setCount(prevCount => prevCount - 1)
            }, 1000)
            setTimeout(() => {
                setRedirectLogin(true)
            }, 5000)
            return () => clearInterval(count)
        }
    }

    return (
        <>
            {redirectLogin && <Navigate to="/login" />}
            <title>{import.meta.env.VITE_APP_TITLE} - Mot de passe oublié</title>
            <main>
                <h1>Mot de passe oublié</h1>
                <form onSubmit={handleSubmit} action="#" method="get">
                    <div>
                        <label htmlFor="username">Adresse Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Adresse Email"
                            onChange={(e) => {
                                setEmail(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <button type="submit">M'envoyer un nouveau mot de passe</button>
                </form>
                <a>{error}</a>
            </main>
        </>
    )
}

export default Forgot
