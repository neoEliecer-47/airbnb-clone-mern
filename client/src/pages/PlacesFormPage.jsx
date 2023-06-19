import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PhotoUploader from '../components/PhotoUploader'
import Perks from '../components/Perks'
import axios from "axios";
import { useUserContext } from "../../context/UserContext";


const PlacesFormPage = ({ placeid = null }) => {
  const {setGo} = useUserContext()
    
  const initialValues = {
        title: "",
        address: "",
        photoLink: "",
        perks: [],
        placeDescription: "",
        extraInfo: "",
        checkin: 15,
        checkout: 13,
        maxguests: 1,
        price: 50
      };

//console.log(placeid)

    

    const [values, setValues] = useState(initialValues);
    const [addedPhotos, setAddedPhotos] = useState([]);
   
    
    const navigate = useNavigate()
  
      //solucionar error de place no autorizado

    useEffect(() => {

      if(!placeid) return;//los Objectid de mongoose solo pueden ser enviados por params!!!
      axios.get("/places/get-place/"+placeid)
        .then(({ data, status }) => {
          console.log(data)
          //setOwner(data.owner)
         
          if(status === 200) console.log('ok')
          setValues(prev => {
            return {...prev, title: data.title, address: data.address,
               placeDescription: data.placeDescription, perks: data.perks, extraInfo: data.extrainfo,
              checkin: data.checkin, checkout: data.checkout, maxguests: data.maxGuests, price: data.price}
          })
         /* setAddedPhotos(prev => {
          return [...prev, [data.photos]]
        })*/
        setAddedPhotos(data.photos)//a veces hay que iniciar primero por lo sencillo para orientarse...
        })
          .catch(err => console.log(err))

    }, [placeid])



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const {title, address, perks, placeDescription, extraInfo, checkin, checkout, maxguests, price} = values
        
        //console.log(values);
        //console.log(data)
        const res = await axios.post("/places/new-places", {
          title, 
          address, 
          perks, 
          placeDescription, 
          extraInfo, 
          checkin, 
          checkout, 
          maxguests, 
          addedPhotos,
          price
        })
        console.log(res)
        if(res) setGo(true)
        
        //desea agregar un sitio mas? si=limpia los campos, no=redirecciona y limpia
        setValues(initialValues)
        setAddedPhotos([])
        navigate('/account/places')
      };  
  


      const handleChange = (e) => {
        const { name, value, type, checked } = e.target; //esto devuelve un objeto del elemento seleccionado permitiendo poder acceder a sus atributos mediante el Destructuring
    
        setValues({
          ...values,
          [name]:
            type === "checkbox" //al ser un objeto, no acepta puntos y caracteres extraños en las propiedades, por eso el uso de corchetes y asi lo hacemos dinamico con el event delegation
              ? checked
              : value,
        });
      };


      const handleUpdating = async (e) => {
        e.preventDefault()
        try {
          
          const {title, address, perks, placeDescription, extraInfo, checkin, checkout, maxguests, price} = values

          const {status} = await axios.patch('/places/update-place/'+placeid, {//patch sirve para actualizar parcialmente un documento o un recurso
            
            title, 
              address, 
                perks, 
                  placeDescription, 
                    extraInfo, 
                      checkin, 
                        checkout, 
                          maxguests,
                            addedPhotos,
                              price
                              

          })
          //console.log(data)
          if(status === 200) {
            setGo(true)
            navigate('/account/places')
          }
          
        } catch (error) {
          console.log(error.message)
        }
      }

    return (
    <div className="max-w-5xl mx-auto">
          <h1 className="text-center text-3xl p-2 bg-primary_red text-white mb-6 font-semibold rounded-tl-full rounded-tr-full">
            {placeid ? "Edita datos de tu alojamiento" : "Registra un nuevo alojamiento"}
          </h1>
          <form onSubmit={placeid ? handleUpdating : handleSubmit}>
            <h2 className="text-2xl mt-4">Titulo</h2>
            <p className="text-gray-500 text-sm">
              el título para tu alojamiento deberia ser corto y pegadizo, como
              en un anuncio
            </p>
            <input
              type="text"
              placeholder="ejem: refugio amanecer romántico"
              value={values.title}
              onChange={handleChange}
              name="title"
            />

            {/*{errors.title && touched.title && errors.title}*/}

            <h2 className="text-2xl mt-4">Dirección</h2>
            <input
              type="text"
              placeholder="dirección de tu alojamiento"
              value={values.address}
              onChange={handleChange}
              name="address"
            />
            <h2 className="text-2xl mt-4">Fotos</h2>
            <p className="text-gray-500 text-sm">más = mejor</p>

            <PhotoUploader values={values} setValues={setValues} handleChange={handleChange} addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos}/>
     {/*photos here */}
            <h2 className="text-2xl mt-4">Descripción</h2>
            <p className="text-gray-500 text-sm">descripción del lugar</p>
            <textarea
              value={values.placeDescription}
              onChange={handleChange}
              name="placeDescription"
            />
            <h2 className="text-2xl mt-2">Beneficios</h2>
            <p className="text-gray-500 text-sm">
              selecciona todos los beneficios o servicios que ofrece tu
              alojamiento
            </p>

            {/*--- Perks ---*/}
            <Perks values={values} onChange={setValues} />

            <h2 className="text-2xl mt-2">Información extra</h2>
            <p className="text-gray-500 text-sm">
              reglas del alojamiento, entre otros.
            </p>
            <textarea
              value={values.extraInfo}
              onChange={handleChange}
              name="extraInfo"
            />
            <h2 className="text-2xl mt-2 text-center">
              Horario de check-in y check-out (entrada y salida) y máximo de
              huéspedes
            </h2>
            <p className="text-gray-500 text-sm text-center">
              añade el tiempo de entrada y salida en <span className="text-black font-semibold">hora militar</span>, recuerda tener una ventana de
              tiempo para limpiar la habitación entre huéspedes y precio por noche
            </p>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mt-3 -mb-1">hora de entrada:</h3>
                <input
                  type="number"
                  placeholder="desde 15:00 hasta 21:00"
                  value={values.checkin}
                  onChange={handleChange}
                  name="checkin"
                />
              </div>
              <div>
                <h3 className="mt-3 -mb-1">hora de salida:</h3>
                <input
                  type="number"
                  placeholder="max 1:00 pm"
                  value={values.checkout}
                  onChange={handleChange}
                  name="checkout"
                />
              </div>
              <div>
                <h3 className="mt-3 -mb-1">máximo de huespedes</h3>
                <input
                  type="number"
                  value={values.maxguests}
                  onChange={handleChange}
                  name="maxguests"
                />
              </div>
              <div>
                <h3 className="mt-3 -mb-1">precio por noche (precio en dólares)</h3>
                <input
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  name="price"
                  placeholder="precio en dólares $"
                />
              </div>
            </div>
            <div className="w-full md:max-w-lg md:mx-auto my-6">
              <button type="submit" className="primary">
                {placeid ? "Actualizar datos" : "Guardar todo"}
              </button>
            </div>
          </form>
        </div>
  )
}

export default PlacesFormPage