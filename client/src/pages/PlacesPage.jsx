import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlusIcon from "../assets/icons/PlusIcon";


import * as Yup from "yup";


import PlacesFormPage from "./PlacesFormPage";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import PlaceImg from "../components/PlaceImg";


const PlacesPage = () => {
  
  const { go, setGo } = useUserContext()
  const { action } = useParams();
  console.log(action);
  const [places, setPlaces] = useState([])
  
  //const [perks, setPerks] = useState([])
  
  useEffect(() => {
    axios.get("/places/get-places")
      .then(({ data }) => {
        setPlaces(data)
        setGo(false)
      })//no alcanza a guardarse en el placeFormPage
      .catch(err => console.log(err))


  }, [go])

  

  /*const validationSchema = Yup.object().shape({
    title: Yup.string().required("titulo requerido").trim(),
  });*/

  //if(places) console.log(places)
  
  //if(redirect) return <Navigate to={redirect} />infinite loop ya que el estado nunca cambia y se mantiene basicamente en la misma pagina
  
  
  return (
    <div>
      {action !== "new" && (
        <>
           <div className="text-center mt-10 mb-6">
              <Link
                className="inline-flex gap-1 bg-primary_red py-2 px-6 text-white rounded-full hover:bg-[#50B67B] duration-500"
                to={"/account/places/new"}
              >
                <PlusIcon />
                Añadir un nuevo alojamiento
              </Link>
            </div>
            
            <div className="mt-4">
              {places?.length > 0 && action === undefined && places.map((place, index) => (
              <Link to={'/account/places/'+place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl mb-2 cursor-pointer hover:bg-gray-200 duration-300" key={place._id} title={`pulsa para editar ${place.title}`}>
                <div className="shrink-0 mt-2 w-32 h-32">
                 {place.photos?.length > 0 && (

                   <PlaceImg place={place} className="w-32 h-32 rounded-bl-2xl rounded-tl-2xl object-cover"/>
                 )
                  }
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl mt-2 font-semibold">{place.title}</h2>
                  <p className="text-sm mt-2">{place.placeDescription}</p>       
                </div>
              </Link>
            ))}
            </div>
        
        </>
      )}

      {action === "new" && (
        
        <PlacesFormPage />
      
      )}

      {action?.length === 24 && (
        <PlacesFormPage placeid={action}/>
        
      )}
      
    </div>
  );
};

export default PlacesPage;
