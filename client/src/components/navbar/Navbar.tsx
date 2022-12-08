import { useSelector } from 'react-redux'
import AuthAPI from '../../api/AuthAPI'
import { Link, redirect } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((state: any) => state.user)
  
  const refresh = async () => {
    window.location.reload()
  }

  const handleSubmit = async () => {
    const res = await AuthAPI.logout({})
    refresh()
  }

  return (
    <>
      <header className="nav">
        <div className="nav-menu">
          <a>{import.meta.env.VITE_APP_TITLE}</a>
          <ul>
            <li>
              <Link to={'/home'}>Accueil</Link>
            </li>
          </ul>
          <ul>
            {user.isLogged === false && (
              <li>
                <Link to={'/login'}>Connexion</Link>
              </li>
            )}
            {user.isLogged === false && (
              <li>
                <Link to={'/register'}>Inscription</Link>
              </li>
            )}

            {user.isLogged === true && (
              <li>
                <Link to={'/profil'}>Profil</Link>
              </li>
            )}
            {user.isLogged === true && (
              <li>
                <button
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar
