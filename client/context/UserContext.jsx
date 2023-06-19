import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const UserContext = createContext()

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    const [error, setError] = useState({})
    //const [page, setPage] = useState('')
    const [go, setGo] = useState(false)

    const navigate = useNavigate()
    
    //console.log(page)
    
    useEffect(() => {
        if(!user){
        axios.get("/auth/profile").then(user => {//por ser axios asincrono y no poder poner await por ser useeffect sincrono, usamos el then para que funione con el estado
            
            setUser(user.data)
            setReady(true)
            console.log('entro en effect context')
        })
        .catch(err => setReady(true))//
        }
    }, [])
    
    
    return(

        <UserContext.Provider value={{user, setUser, ready, error, setError, setReady, go, setGo}}>
            {children}
        </UserContext.Provider>

    )
}

export default UserProvider
export const useUserContext = () => useContext(UserContext)