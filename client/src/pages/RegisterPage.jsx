import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../context/UserContext";

/*const Mensajes = ({mensaje}) => {
  
  
  switch (mensaje) {
      case mensaje.data.statusText === "OK":
          
      const toast = () => {
        toast.success("registrado exitosamente !", {
          position: toast.POSITION.TOP_RIGHT
        });
      }

          return(
            <RegisterPage toast={toast}/>
          )
          break;
      case mensaje.code ==="ERR_BAD_REQUEST":

      default:
          break;
  }


  
}*/

const RegisterPage = () => {
  const { setUser } = useUserContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  
  
  
  
  const handleChange = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case name === "text":
        setName(value);
      case name === "email":
        setEmail(value);
      case name === "password":
        setPassword(value);
      default:
        break;
    }
  }; //usar useeffect con un estado ???

  useEffect(() => {
    if (mensaje) setSuccess(mensaje);
  }, [mensaje]);

  const msj = () => {
    if (success === "exito") {
      toast.success("usuario registrado exitosamente !", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/account");
    }

    if (success === "ya existe usuario") {
      toast.error("usuario ya existente !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //axios.get('/')
    //console.log(data)
    try {
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      setName("")
      setEmail("")
      setPassword("")
      navigate("/account");
      alert("cuenta creada, Bienvenido !");
    } catch (error) {
      console.log(error);
      setMensaje("ya existe usuario");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-center text-4xl mb-4">Registro</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary" onSubmit={handleSubmit}>
            Continúa
          </button>
          <ToastContainer autoClose={2000} />
          <div className="text-center py-2 text-gray-500">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="underline text-black">
              {" "}
              Iniciar sesión{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
