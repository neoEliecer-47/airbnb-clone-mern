import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MorePhotos from "../assets/icons/MorePhotos";
import CloseIcon from "../assets/icons/CloseIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import ReservaWidget from "./ReservaWidget";
import AddressLink from "../components/AddressLink";



const PlaceDetailsPage = () => {
  const { placeid } = useParams();
  //const navigate = useNavigate()
  const [place, setPlace] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);


  useEffect(() => {
    if (!placeid) return;
    axios
      .get("/places/places/" + placeid)
      .then(({ data }) => {
        console.log(data);
        setPlace(data);
      })
      .catch((err) => console.log(err.message));
  }, [placeid]);

  //if(!place) return <div>loading...</div>
  const path = "http://localhost:8000/uploads/";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-w-full">
        <div className="p-8 grid gap-4">
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed top-1 left-10 flex gap-1 cursor-pointer items-center rounded-lg text-white bg-indigo-500 shadow shadow-black hover:shadow-lg py-1 px-4 duration-500 hover:bg-primary_red"
            >
              <CloseIcon />
              Cerrar fotos
            </button>
          </div>
          <div className="max-w-[75%] mx-auto grid gap-2 items-center justify-center">
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <img src={photo} alt="" className="w-full h-full object-contain" />
              ))}
          </div>
        </div>
      </div>
    );
  }

  /* if(information){
    return (
      <div className="">
        hola
        <button onClick={() => setInformation(false)}>click</button>
      </div>
    )
  }*/

  
  return (
    
    <div
      className={'mt-6 py-8 -mx-8 px-8 bg-gray-100' }
    >
      <h1 className="text-2xl font-semibold">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="w-full h-full aspect-square object-cover rounded-tl-2xl rounded-bl-2xl"
                  src={place.photos?.[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            {place.photos?.[1] && (
              <img
                className="h-full aspect-square object-cover rounded-tr-2xl"
                src={place.photos?.[1]}
                alt=""
              />
            )}

            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="h-full object-cover relative rounded-br-2xl"
                  src={place.photos?.[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-4 right-4 border border-gray-800 py-1 px-2 rounded-lg bg-gray-100 font-semibold hover:bg-indigo-500 hover:text-white duration-500 shadow shadow-black"
        >
          <MorePhotos />
          Mostrar todas las fotos
        </button>
      </div>

      <div className="my-4 grid grid-cols-1 gap-6 md:grid-cols-2 p-3">
        <div>
          <div className="my-4 border-b-2 border-gray-300 pb-3">
            <h2 className="font-semibold text-2xl mb-2">Descripción</h2>
            {place.placeDescription}
          </div>
          Llegada: {place.checkin} 
          <br />
          Salida: {place.checkout} 
          <br />
          Máximo de huespedes: {place.maxGuests}
          
          <article className="bg-white mt-4 text-sm text-gray-500 border-2 border-dashed border-primary_red p-3 leading-5 hover:shadow-md hover:shadow-primary_red" title="informacón extra">
            {place.extrainfo}
          </article>
        </div>

        <div>
          <ReservaWidget place={place} />
        </div>

        
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
