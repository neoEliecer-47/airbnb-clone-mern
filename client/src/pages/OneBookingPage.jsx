import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import AddressLink from "../components/AddressLink";

const OneBookingPage = ({ bookingid = null }) => {
  const { user } = useUserContext();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (bookingid) {
      axios
        .get("/booking/books")
        .then((res) => {
          const foundBooking = res.data.find(({ _id }) => _id === bookingid);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [bookingid]);

  if (!booking) return "cargando..."; //cargando hasta que llegue la respesta y el estado cambie. simplemente sin complicarse

  const path = "http://localhost:8000/uploads/";

  return (
    <div className="">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-center">{booking.place.title}</h1>
        <AddressLink className="items-center justify-center">{booking.place.address}</AddressLink>
        <aside className="">
            {booking.place.placeDescription}
        </aside>
      </header>

      <div className="flex">
        <article className="flex flex-row mt-2 p-2  gap-2">
          {booking.place.photos?.[1] && (
            <img src={booking.place.photos[1]} alt="" className="w-28 rounded-full h-28 hover:w-52 hover:h-52 duration-500" />
          )}

          {booking.place.photos?.[2] && (
            <img src={booking.place.photos[2]} alt="" className="w-28 rounded-full h-28 hover:w-52 hover:h-52 duration-500" />
          )}

          {booking.place.photos?.[3] && (
            <img src={booking.place.photos[3]} alt="" className="w-28 rounded-full h-28 hover:w-52 hover:h-52 duration-500" />
          )}

          {booking.place.photos?.[4] && (
            <img src={booking.place.photos[4]} alt="" className="w-28 rounded-full h-28 hover:w-52 hover:h-52 duration-500" />
          )}
        </article>
      </div>

     
    </div>
  );
};

export default OneBookingPage;
