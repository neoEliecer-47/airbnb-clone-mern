import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import PlaceIcon from "../assets/icons/PlaceIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import BookmarkIcon from "../assets/icons/BookmarkIcon";
import BookingsPage from "./BookingsPage";

const AccountPage = () => {
  const { user, setUser, ready, error, setReady } = useUserContext();
  let { subpage } = useParams();
  const [autorization, setAutorization] = useState(false)
  const navigate = useNavigate()
  
  console.log('entró en aaacount page')
  
  //if(!user && !autorization) return <Navigate to={'/login'} />
  
  const logout = async () => {
    await axios.post("/auth/logout")
    setUser(null)
    setReady(true)
    navigate("/")
  }
  


  /*useEffect(() => {
    if()
    subpage = page
    console.log(page)
  }, [])*/
  
  if(subpage === undefined) {
    subpage = "profile"
    
  }
  
  
 /* if(error) {
    if(error?.response?.status === 401){

      alert("La sesión expiró, por favor ingrese nuevamente");
       <Navigate to="/login" />;
       console.log('entró a error')
    }
    
  }*/
  
  
  if (!ready) return 'Cargando...'

  if (ready && !user ) {
    alert("sesión caducada, por favor ingrese nuevamente");
    return <Navigate to="/login" />;
  }
  
  
  function linkClasses(type = null) {
    let classes = "inline-flex gap-2 py-2 px-6 rounded-full duration-500";
    if (type === subpage ) {//|| (subpage === undefined && type === "profile")
      classes += " bg-primary_red text-white ";
    } else {
      classes += ' bg-gray-100 hover:bg-gray-200 duration-500'
    }
    return classes;
  }
  //
//onClick={() => setPage('profile')}
  



//if(!autorization) return setAutorization(true)

return (
  <div>
  <nav className="w-full flex justify-center mt-8 gap-2 mb-4">
    <Link className={linkClasses("profile")} to="/account">
      <ProfileIcon />
      Mi perfil
    </Link>
    <Link className={linkClasses("bookings")} to="/account/bookings">
      <BookmarkIcon />
      Mis reservaciones
    </Link>
    <Link className={linkClasses("places")} to="/account/places">
      <PlaceIcon />
      Mis alojamientos
    </Link>
  </nav>
    {
      subpage === "profile" && (
        <div className="text-center">
          Sesión iniciada por <span className="font-semibold">{user?.name}</span> ({user?.email}) <br />
          <button className="primary max-w-sm mx-auto rounded-full mt-2" onClick={logout}>Cerrar sesión</button>
        </div>
      )
    }
    {
      subpage === "places" && (
        <PlacesPage />
      )
    }
    {
      subpage === "bookings" && (
        <BookingsPage />
      )
    }
</div>
  );
};

export default AccountPage;
