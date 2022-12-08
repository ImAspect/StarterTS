import { useState, useEffect, FormEvent } from 'react'
import AuthAPI from '../../api/AuthAPI'
import { useSelector } from 'react-redux'

const UpdatePassword = () => {
    const user = useSelector((state: any) => state.user)

    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setEmail(user.infos.email)
    }, [])

    const refresh = async () => {
        window.location.reload()
      }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const res = await AuthAPI.updatePassword({
            password,
            newPassword,
            newPasswordConfirmation,
            email
        })
        
        if (res.status === 200) {
            const res = await AuthAPI.logout({})
            setTimeout(() => {
                return refresh()
            }, 2500)
        }
        return setError(res.msg)
    }

    return (
        <>
            <main>
                <title>{import.meta.env.VITE_APP_TITLE} - Modifier le mot de passe</title>
                <>
                    <h1>Modification du mot de passe</h1>
                    <form onSubmit={handleSubmit} action="#" method="post">
                        <div>
                            <label htmlFor="password">Mot de passe actuel</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe actuel"
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Nouveau mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Nouveau mot de passe"
                                onChange={(e) => {
                                    setNewPassword(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Nouveau confirmation</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Nouveau confirmation"
                                onChange={(e) => {
                                    setNewPasswordConfirmation(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <button type="submit">Modifier mon mot de passe</button>
                    </form>
                    <a>{error}</a>
                </>
            </main>
        </>
    )
}

export default UpdatePassword
