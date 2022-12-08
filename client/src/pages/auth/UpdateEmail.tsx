import { FormEvent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AuthAPI from '../../api/AuthAPI'

const UpdateEmail = () => {
    const user = useSelector((state: any) => state.user)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [page1, setPage1] = useState(true)
    const [page2, setPage2] = useState(false)
    const [page3, setPage3] = useState(false)
    const [page4, setPage4] = useState(false)

    useEffect(() => {
        setEmail(user.infos.email)
    }, [])

    const refresh = async () => {
        window.location.reload()
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const res = await AuthAPI.sendVerifyUpdate({
            email
        })

        if (res.status !== 200)
            return setError(res.msg)

        if (res.status === 200) {
            setPage1(false)
            setPage2(true)
            return setError(res.msg)
        }
    }

    const handleSubmit2 = async (event: FormEvent) => {
        event.preventDefault()
        const res = await AuthAPI.verifyUpdate({
            email,
            code
        })

        if (res.status !== 200)
            return setError(res.msg)

        if (res.status === 200) {
            setPage2(false)
            setPage3(true)
            return setError(res.msg)
        }
    }

    const handleSubmit3 = async (event: FormEvent) => {
        event.preventDefault()
        const res = await AuthAPI.updateEmail({
            email,
            newEmail,
            password
        })

        if (res.status !== 200)
            return setError(res.msg)

        if (res.status === 200) {
            setPage3(false)
            setPage4(true)
            setError(res.msg)
            const resData = await AuthAPI.logout({})
            if (resData.status === 200) {
                setTimeout(() => {
                    return refresh()
                }, 2500)
            }
        }
    }

    return (
        <>
            <main>
                <title>{import.meta.env.VITE_APP_TITLE} - Modifier l'Adresse Email</title>
                {page1 === true ?
                    <>
                        <h1>Vérification pour modification de l'adresse email</h1>
                        <form onSubmit={handleSubmit} action="#" method="get">
                            <h4>Afin de vérifier si vous êtes bien le propriétaire du compte {email} nous avons besoin d'un code de vérification</h4>
                            <button type="submit">Envoyer un code de vérification</button>
                        </form>
                    </>
                    : page2 === true ?
                        <>
                            <h1>Code envoyé à l'adresse {email}</h1>
                            <form onSubmit={handleSubmit2} action="#" method="post">
                                <div>
                                    <label htmlFor="code">Code reçu par email</label>
                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Code de vérification"
                                        onChange={(e) => {
                                            setCode(e.currentTarget.value)
                                        }}
                                    />
                                </div>
                                <button type="submit">Valider le code de vérification</button>
                            </form>
                        </>
                        : page3 === true ?
                            <div>
                                <h4>Modification de votre adresse email</h4>
                                <form onSubmit={handleSubmit3} action="#" method="post">
                                    <div>
                                        <label htmlFor="newEmail">Nouvelle adresse email</label>
                                        <input
                                            type="text"
                                            name="newEmail"
                                            placeholder="Nouvelle adresse email"
                                            onChange={(e) => {
                                                setNewEmail(e.currentTarget.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Mot de passe</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Mot de passe"
                                            onChange={(e) => {
                                                setPassword(e.currentTarget.value)
                                            }}
                                        />
                                    </div>
                                    <button type="submit">Modifier mon adresse email</button>
                                </form>
                            </div>
                            : page4 === true &&
                            <div>
                                <h4>Votre adresse email à été modifier</h4>
                            </div>
                }
                <a>{error}</a>
            </main>
        </>
    )
}

export default UpdateEmail