import { useState } from "react";
import axios from "axios";

import PhotoIcon from "../assets/icons/PhotoIcon";
import TrashIcon from "../assets/icons/TrashIcon";
import LikeIcon from "../assets/icons/LikeIcon";

const PhotoUploader = ({
  values,
  setValues,
  handleChange,
  addedPhotos,
  setAddedPhotos,
}) => {
  const addPhotoByLink = async (e) => {//con el link descargamos la imagen, la guardamos en el servidor y luego la mostramos descargada desde el servidor!!
    //no es necesario que lo que se le pase por parametros al metodo sea del mismo nombre que lo que se le pasó
    e.preventDefault();

    try {
    /*  const { data: filename } = await axios.post("/photos/uploaded-by-link", {//configurar api url base
        link: values.photoLink,//el url se guarda en photLink
      });*/

     let file = values.photoLink
     const foto = file.toString()
     console.log(foto)
      setAddedPhotos((prev) => [...prev, foto]);
      setValues((prev) => {
        return { ...prev, photoLink: "" };//implicit return
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoFromDevice = (photo) => {
    
    
    
    /*  axios
    .post("/photos/uploaded-by-device", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: filenames } = res;
        //console.log(filename)
      })
      .catch((err) => console.log(err));*/
      


      if(!photo){
        alert('selecciona una foto')
        return;  
    }    
    const uploadPreset = "chat22"
    const cloudName = "qsxpjlh1299nbzv"    
    
    
    
    
    
    
    if(photo.type === 'image/jpeg' || photo.type === 'image/png' || photo.type === 'image/jpg'){
          const data = new FormData();
          
          
          
          data.append('file', photo);
          data.append("upload_preset", 'chatapp');
          data.append('cloud_name', cloudName);

        
          fetch("https://api.cloudinary.com/v1_1/qsxpjlh1299nbzv/image/upload", {
            method: 'POST',
            
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
              const file = data.url.toString()
              console.log(file)
              setAddedPhotos((prev) => [...prev, file]);
               console.log(addedPhotos)
                
            })    
            .catch (err => {
                    console.log(err)
                    
                })
        
        
        
        }else {
          alert("sólo imagenes tipo jpeg, png o jpg")
        }
        
        
        
      
      //const instance = axios.create()
      //const foto = file.toDataURL()
       
        
        
        

        
    




    /**/
  };

  const removePhoto = (e, filename) => {
    e.preventDefault()
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
    console.log(addedPhotos);
  };

  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault()
    const arrayFavorite = addedPhotos.filter(photo => photo !== filename)
    arrayFavorite.splice(0,0, filename)//cambia el array original
    setAddedPhotos(arrayFavorite)
    /*var array = ['uno','dos','tres','cuatro','cinco']
    console.log(array.slice(0,3))
    
    console.log(array.splice(0, 0, filename))//splice manipula el array original y devuelve los elementos borrados en caso de borrarlos sino, devuelve un array vacio
    console.log(array)*/

   // const newAdd = [filename, ...rest of Elements except filename] it works too but firts we have to delete the link photo that has been selected from the original array (addedPhotos)
  };
//"http://localhost:8000/uploads/" + 
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="añadir foto usando un link... "
          value={values.photoLink}
          onChange={handleChange}
          name="photoLink"
        />
        {values.photoLink?.length > 0 && ( //transition delay-150
          <button
            className="bg-green-600 hover:bg-green-700 duration-500 text-white px-4 rounded-2xl"
            type="submit"
            onClick={addPhotoByLink}
          >
            Añadir&nbsp;foto
          </button>
        )}
      </div>
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-2">
        {addedPhotos?.length > 0 &&
          addedPhotos.map((photo, index) => (
            <div key={index} className="relative h-56 flex">
              <img
                className="rounded-2xl w-full object-cover"
                src={photo}
                alt=""
              />
              <button
                onClick={(e) => removePhoto(e, photo)}
                className="absolute cursor-pointer bottom-2 right-2 text-white bg-gray-600 bg-opacity-50 hover:bg-gray-800 duration-300 rounded-2xl p-1"
                title="Eliminar foto"
              >
                <TrashIcon />
              </button>
              {photo === addedPhotos[0] && (
                <label title="Foto favorita">
                  <LikeIcon
                  className="absolute w-7 h-7 cursor-pointer bottom-2 left-2 text-white duration-300 rounded-2xl"
                  fill="#F5385D"
                  
                />
                </label>
              )}
              {photo !== addedPhotos[0] && (
                <button
                  onClick={(e) => selectAsMainPhoto(e, photo)}
                  className="flex justify-center"
                  title="Elegir como foto favorita"
                >
                  <LikeIcon className="absolute w-7 h-7 cursor-pointer bottom-2 left-2 text-white bg-gray-600 bg-opacity-50 hover:bg-gray-800 rounded-2xl p-1 hover:fill-[#F5385D] duration-300 transition-all transform"/>
                </button>
              )}
            </div>
          ))}

        <label
          title="añardir foto desde su dispositivo"
          className="h-56 cursor-pointer flex justify-center gap-1 border-2 p-8 bg-transparent rounded-2xl text-2xl text-gray-600 items-center"
          value={addedPhotos}
          name="addedPhotos"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => uploadPhotoFromDevice(e.target.files[0])}
          />
          <PhotoIcon />
          Añadir
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;
