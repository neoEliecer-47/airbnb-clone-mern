import { useParams } from "react-router-dom"


const NotFoundPage = () => {
  
    const {} = useParams()

    const mensaje = alert("404: la ruta a la que intentas ir, no existe")
  
    return (
    <div>
        {mensaje}
        <Link className="p-2 bg-primary_red text-white" to="/">Volver al inicio</Link>
    </div>
  )
}

export default NotFoundPage