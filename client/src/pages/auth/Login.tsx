import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthAPI from '../../api/AuthAPI'

const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const refresh = async () => {
    window.location.reload()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await AuthAPI.login({
      username,
      password,
    })

    setError(res.msg)
    if (res.status === 200) return refresh()
  }
  
  return (
    <>
      <main>
        <title>{import.meta.env.VITE_APP_TITLE} - Connexion</title>
        <a>{error}</a>
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
          <Link to='/forgot'>Mot de passe oublié ?</Link>
          <button type="submit">Connexion</button>
        </form>
      </main>
    </>
  )
}

export default Login
