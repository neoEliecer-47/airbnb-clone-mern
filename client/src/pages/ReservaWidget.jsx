import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ReservaWidget = ({ place }) => {
  const initialValues = {
    checkin: "",
    checkout: "",
    guestsNumber: 1,
    clientName: "",
    clientdni: "",
    clientEmail: "",
    payMethod: "Tarjeta de Débito",
    clientPhoneNumber: "",
  };
  const { user } = useUserContext();
  const [booking, setBooking] = useState(initialValues);
  const navigate = useNavigate()

  
  useEffect(() => {
    if(user) setBooking({...booking, clientName: user.name, clientEmail: user.email})
  }, [user])
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBooking({ ...booking, [name]: value });
  };

  let numberOfNights = 0;
  if (booking.checkin && booking.checkout) {
    numberOfNights = differenceInCalendarDays(
      new Date(booking.checkout),
      new Date(booking.checkin)
    );
    console.log(numberOfNights);
  }

  const handleBookSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Debes iniciar sesión o registrarte para reservar",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        denyButtonText: `Registrarse`,
        denyButtonColor: "green",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/login')
        } else if (result.isDenied) {
          navigate('/register')
        }
      });

      return;
    }

    if(!(booking.checkin && booking.checkout)) {
      return Swal.fire('Seleccione fechas')
    }

    const {
      checkin,
      checkout,
      guestsNumber,
      clientName,
      clientdni,
      clientEmail,
      payMethod,
      clientPhoneNumber,
    } = booking;
    const bookedPlace = place._id;

    const res = await axios.post("/booking/books", {
      place: bookedPlace,
      checkin,
      checkout,
      guestsNumber,
      clientName,
      clientdni,
      clientEmail,
      payMethod,
      clientPhoneNumber,
      price: numberOfNights * place.price
    });

    Swal.fire({
      title: 'Has reservado '+place.title +' exitosamente',
      imageUrl: place.photos[0],
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showConfirmButton: true,
      confirmButtonText: 'Ir a mis reservas'
    }).then((result) => {
      if(result.isConfirmed){
        return navigate('/account/bookings')
      }
    })
   
    setBooking(initialValues)
    navigate('/')
  };

  return (
    <div className="bg-white rounded-lg py-6 px-6 text-center shadow-lg shadow-gray-600">
      <h2 className="text-lg font-semibold text-center mb-4">
        Precio: {place.price}$ / por noche
      </h2>
      <form onSubmit={handleBookSubmit}>
        <div className="border rounded-md border-gray-400">
          <div className="flex items-center">
            <div className=" border-r border-gray-400 py-2 px-4">
              <label>Llegada: </label>
              <input
                type="date"
                value={booking.checkin}
                name="checkin"
                onChange={handleChange}
              />
            </div>

            <div className=" border-gray-400 py-2 px-4">
              <label>Salida: </label>
              <input
                type="date"
                value={booking.checkout}
                name="checkout"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" border-gray-400 py-2 px-4 border-t">
            <label>Número de huespedes: </label>
            <input
              type="number"
              className=" hover:bg-gray-200"
              value={booking.guestsNumber}
              name="guestsNumber"
              onChange={handleChange}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <>
            <div className=" border-gray-400 py-2 px-4">
              <label>Nombre completo: </label>
              <input
                type="text"
                value={booking.clientName}
                name="clientName"
                onChange={handleChange}
              />

              <label>Correo: </label>
              <input
                type="text"
                value={booking.clientEmail}
                name="clientEmail"
                onChange={handleChange}
              />
              
              
              <label>Cédula: </label>
              <input
                type="text"
                value={booking.clientdni}
                name="clientdni"
                onChange={handleChange}
              />


              <label>Número de tlf: </label>
              <input
                type="tel"
                value={booking.clientPhoneNumber}
                name="clientPhoneNumber"
                onChange={handleChange}
              />

              <div className="mt-4 mb-2 border rounded-md p-2">
                <label>Método de pago: </label>
                <select
                  value={booking.payMethod}
                  name="payMethod"
                  onChange={handleChange}
                >
                  <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Zelle">Zelle</option>
                </select>
              </div>
            </div>
          </>
        )}
        <button
          className="primary mt-4 hover:drop-shadow-md duration-500 hover:shadow-primary_red"
          title={`reservar ${place.title}`}
        >
          Reservar
          {numberOfNights > 0 && <span> {numberOfNights * place.price} $</span>}
        </button>
      </form>
    </div>
  );
};

export default ReservaWidget;
