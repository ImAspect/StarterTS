import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profil = () => {
  const user = useSelector((state: any) => state.user)

  return (
    <>
      <main className="profil">
      <title>{import.meta.env.VITE_APP_TITLE} - {user.infos.username}</title>
      <h1>Informations de mon compte</h1>
        <ul>
          <li>Nom d'utilisateur : {user.infos.username}</li>
          <li>Adresse Email : {user.infos.email}</li>
          <li>Compte vérifié : {user.infos.verified === 1 ? 'Oui' : 'Non'}</li>
        </ul>
        <h1>Actions sur mon compte</h1>
        <ul>
          <li><Link to='/update/email'>Modifier mon adresse email</Link></li>
          <li><Link to='/update/password'>Modifier mon mot de passe</Link></li>
        </ul>
      </main>
    </>
  )
}

export default Profil
