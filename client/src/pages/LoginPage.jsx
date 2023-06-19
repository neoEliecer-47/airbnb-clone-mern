import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"//nuestro propio hook


const LoginPage = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser, setError, ready, setReady} = useUserContext()



  useEffect(() => {
    setEmail('guestUser@test.com')
    setPassword("123")
  }, [])
  
  
  if(!ready) return <Navigate to={'/account'} />
  
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      
        const {data} = await axios.post('/auth/login', {
          email,
          password
        })
        
        

        //console.log(userData)
        setUser(data)
        //setError({})
        //setReady(true)
        setEmail('')
        setPassword('')
    
        alert('Bienvenido! puede ingresar a su perfil en el icono de perfil 😁')
    
        setRedirect(true)

    } catch (error) {
      console.log(error)
      if(error.response?.status === 404)  alert('usuario no encontrado 🚩')
     
    }
  }
  
  
  if(redirect) return <Navigate to={'/'} />//si el return, seguiria con el codigo, o sea el body
  
  
  //revisar max-w-lg!!
    return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">

          <h1 className="text-center text-4xl mb-4">Inicia sesión</h1>
          <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <input 
                  type="email" 
                  placeholder="ingresa tu email"
                  onChange={e => setEmail(e.target.value)}
                  value={email} 
              />
              <input
                type="password"
                placeholder="ingresa tu contraseña"
                onChange={e => setPassword(e.target.value)} 
                value={password}
              />
              
              <button type="submit" className="primary">Continúa</button>
              <div className="text-center py-2 text-gray-500">
                ¿Aún no tienes cuenta? 
                <Link to="/register" className="underline text-black"> regístrate ahora</Link>
              </div>
          </form>
        </div>
    </div>
  )
}

export default LoginPage