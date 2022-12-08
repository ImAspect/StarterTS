import { useState, useEffect } from 'react'
import Logo from '../assets/img/logo.png'
import { Navigate } from "react-router-dom"

const NotFound = () => {
  const [redirectHome, setRedirectHome] = useState<boolean>(false)
  const [count, setCount] = useState<number>(5)

  useEffect(() => {
    const count = setInterval(function () {
      setCount(prevCount => prevCount - 1)
    }, 1000)
    setTimeout(() => {
      setRedirectHome(true)
    }, 5000)
    return () => clearInterval(count)
  })

  return (
    <>
      {redirectHome && <Navigate to="/home" />}
      <title>{import.meta.env.VITE_APP_TITLE} - 404</title>
      <h1>La page demandée est introuvable ! Error: 404</h1>
      <h4>Vous allez être redirigé dans {count <= 1 ? count + ' seconde' : count + ' secondes'} ...</h4>
    </>
  )
}

export default NotFound
