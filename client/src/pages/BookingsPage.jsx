import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";

import CalendarIcon from "../assets/icons/CalendarIcon";
import ArrowIcon from "../assets/icons/ArrowIcon";
import NightIcon from "../assets/icons/NightIcon";
import DollarIcon from "../assets/icons/DollarIcon";
import { Link, useParams } from "react-router-dom";
import OneBookingPage from "./OneBookingPage";

const BookingsPage = () => {
  const [bookings, setBookings] = useState(null);
  //const [res, setRes] = useState('')
  const [ready, setReady] = useState(false);
  const { user } = useUserContext();
  const {action} = useParams();

  useEffect(() => {
    if (!user) return;
    axios
      .get("/booking/books")
      .then((res) => {
        if (res.data.length === 0) {
          setReady(true);
          console.log("entró en vacio");
          return;
        }
        console.log(res);
        setReady(true);
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  if (!ready) return <div>cargando...</div>;
  if (!bookings)
    return <h1 className="text-center">Sin reservaciones todavia</h1>;

  return (
    <>
      {action === undefined && (
        <div className="mt-2">
          {bookings.length > 0 &&
            bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className="my-2 flex gap-2 bg-red-100 hover:bg-red-300 duration-700 rounded-2xl overflow-hidden p-4"
              >
                <div className="">
                  <PlaceImg place={booking.place} />
                </div>

                <section className="py-2 pr-3 grow">
                  <h2 className="font-bold text-xl text-primary_red">
                    {booking.place.title}
                  </h2>
                  <aside className="bg-red-50 rounded-lg pl-1">
                    <p className="mt-3 flex gap-2">
                      {" "}
                      <CalendarIcon />{" "}
                      {format(new Date(booking.checkin), "dd-MM-yyyy")}{" "}
                      <ArrowIcon /> <CalendarIcon />{" "}
                      {format(new Date(booking.checkout), "dd-MM-yyyy")}
                    </p>
                    <article className="text-xl">
                      <p className="flex my-1 gap-2">
                        <NightIcon />{" "}
                        {differenceInCalendarDays(
                          new Date(booking.checkout),
                          new Date(booking.checkin)
                        )}{" "}
                        noche(s){" "}
                      </p>
                      <p className="flex gap-1">
                        Precio total: {booking.price} <DollarIcon />
                      </p>
                    </article>
                  </aside>
                </section>
              </Link>
            ))}
        </div>
      )}
      {
        action?.length === 24 && (
          <OneBookingPage bookingid={action}/>
        )
      }
    </>
  );
};

export default BookingsPage;
