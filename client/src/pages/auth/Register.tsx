import { FormEvent, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import AuthAPI from '../../api/AuthAPI'

const Register = () => {
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const refresh = async () => {
      window.location.reload()
    }

    const res = await AuthAPI.register({
      username,
      email,
      password,
      passwordConfirmation,
    })

    setError(res.msg)

    if (res.status === 200) {
      const resLogin = await AuthAPI.login({
        username,
        password
      })

      if (resLogin.status === 200) {
        setTimeout(() => {
          return refresh()
      }, 2500)
      }
    }
  }
  return (
    <>
      <main>
        <title>{import.meta.env.VITE_APP_TITLE} - Inscription</title>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={(e) => {
                setUsername(e.currentTarget.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="username">Adresse Email</label>
            <input
              type="mail"
              name="email"
              placeholder="Adresse Email"
              onChange={(e) => {
                setEmail(e.currentTarget.value)
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
          <div>
            <label htmlFor="password">Confirmation du mot de passe</label>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirmation"
              onChange={(e) => {
                setPasswordConfirmation(e.currentTarget.value)
              }}
            />
          </div>
          <Link to='/login'>Me connecter</Link>
          <button type="submit">Inscription</button>
        </form>
        <a>{error}</a>
      </main>
    </>
  )
}

export default Register
