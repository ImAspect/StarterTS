import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import uidContext from '../contexts/uidContext'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const uid = useContext(uidContext)
  const location = useLocation()

  if (!uid || uid === null) {
    if (location.pathname === "/login") return children
    if (location.pathname === "/register") return children
    if (location.pathname === "/forgot") return children
    return <Navigate to="/login" replace />
  }

  if (uid !== null) {
    // @ts-ignore
    if (uid.verified === 0 || location.pathname === "/forgot") {
      if (location.pathname === "/verify") return children
      return <Navigate to="/verify" replace />
    } else {
      if (location.pathname === "/profil") return children
      if (location.pathname === "/verify") return children
      if (location.pathname === "/update/password") return children
      if (location.pathname === "/update/email") return children
      return <Navigate to="/profil" replace />
    }
  }

  return children
}

export { ProtectedRoute }