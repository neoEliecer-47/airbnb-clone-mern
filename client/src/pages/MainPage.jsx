import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  //hacer fetch de user places

  useEffect(() => {
    axios
      .get("/places/all-places")
      .then(({ data }) => setPlaces(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {places?.length > 0 &&
        places.map((place) => {
          return (
            <Link to={'/place/'+place._id} key={place._id} className="cursor-pointer hover:bg-blue-50 hover:rounded-xl duration-300 hover:shadow-xl">
              <div className="bg-gray-300 rounded-2xl flex mb-2">
                {place.photos?.[0] && (
                  <img 
                    src={place.photos[0]} 
                    alt="photos here" 
                    className="rounded-2xl object-cover aspect-square"  
                  />
                )}
              </div>
              <h2 className="font-semibold truncate">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="underline font-semibold">${place.price}</span> por noche
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default MainPage;
