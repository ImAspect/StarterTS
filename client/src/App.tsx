import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Footer from './components/footer/Footer'
import NavBar from './components/navbar/Navbar'
import uidContext from './contexts/uidContext'
import { useAuth } from './hooks/useAuth'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot'
import Profil from './pages/auth/Profil'
import Verify from './pages/auth/Verify'
import UpdatePassword from './pages/auth/UpdatePassword'
import UpdateEmail from './pages/auth/UpdateEmail'
import { ProtectedRoute } from './components/Protected'

const App: React.FC = () => {
  const [uid, setUid] = useState<string | null>(null)
  useAuth().then((data) => setUid(data.data))

  return (
    <uidContext.Provider value={uid}>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forgot"
            element={
              <ProtectedRoute>
                <Forgot />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <Verify />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update/password"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update/email"
            element={
              <ProtectedRoute>
                <UpdateEmail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </uidContext.Provider>
  )
}

export default App
