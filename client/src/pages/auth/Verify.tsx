import { FormEvent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AuthAPI from '../../api/AuthAPI'

const Verify = () => {
    const user = useSelector((state: any) => state.user)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [page1, setPage1] = useState(true)
    const [page2, setPage2] = useState(false)
    const [page3, setPage3] = useState(false)

    useEffect(() => {
        setEmail(user.infos.email)
    }, [])

    const refresh = async () => {
        window.location.reload()
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const res = await AuthAPI.sendVerify({
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
        const res = await AuthAPI.verify({
            email,
            code
        })

        if (res.status !== 200)
            return setError(res.msg)

        if (res.status === 200) {
            setTimeout(() => {
                refresh()
            }, 2500)
            setPage2(false)
            setPage3(true)
            return setError(res.msg)
        }
    }

    return (
        <>
            <main>
                <title>{import.meta.env.VITE_APP_TITLE} - Vérification de l'Adresse Email</title>
                {page1 === true ?
                    <>
                        <h1>Vérification de l'adresse email</h1>
                        <form onSubmit={handleSubmit} action="#" method="get">
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
                        : page3 === true &&
                        <div>
                            <h4>Votre compte est maintenant vérifié</h4>
                        </div>
                }
                <a>{error}</a>
            </main>
        </>
    )
}

export default Verify  