import { useUserContext } from "../../context/UserContext"
import MenuIcon from "../assets/icons/MenuIcon"
import PaperAirplaneIcon from "../assets/icons/PaperAirplaneIcon"
import SearchIcon from "../assets/icons/SearchIcon"
import UserIcon from "../assets/icons/UserIcon"
import { Link } from "react-router-dom"


const Header = () => {
  
  const { user } = useUserContext()
  
  
  return (
    <header className="flex items-center justify-center gap-12 md:justify-between md:max-w-screen- mt-2 mb-4 border-b pb-4 pt-2 border-gray-300">
        <Link to={"/"} className="flex items-center gap-1 hover:shadow-xl duration-500">
          <PaperAirplaneIcon />
          <span className="text-xl font-bold">Booking</span>
        </Link>

        <div className="hidden md:flex md:py-2 md:px-4 md:border md:border-gray-300 md:rounded-full md:gap-4 md:h-12 shadow-md shadow-gray-200 hover:shadow-lg duration-300">
          
            <div className="sm:text-sm">En cualquier lugar del mundo</div>
            <div className="border-l border-gray-300 "></div>
            <div className="">Cualquier semana</div>
            <div className="border-l border-gray-300 "></div>
            <div className="">¿Cuántos?</div>

          
          <button className="hidden bg-primary_red rounded-full p-2 text-white md:flex items-center cursor-pointer outline-none">
            <SearchIcon />
          </button>
        </div>

        
         { /*<div className="flex items-center gap-5">
          <span>Pon tu espacio en Airbnb</span>
            <GlobeIcon />
          </div>*/}
          <Link to={user ? "/account" : "/login"} className="py-2 px-4 border border-gray-300 rounded-full flex items-center gap-2 hover:shadow-lg duration-300">
              <MenuIcon />
              <div className="bg-gray-500 flex items-center rounded-full border border-gray-500 overflow-hidden">
                <UserIcon fill="#FFFFFF"/>
              </div>
              {!!user && (//si esto es verdadero, retorna lo siguiente, de lo contrario retorna null; un doble NOT convirte el valor a booleano, si existe true, si no false
                <div className="text-primary_red font-bold">     
                  {user.name}
                </div>
              )}
          </Link>
        
      </header>
  )
}//

export default Header