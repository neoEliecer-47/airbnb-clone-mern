import { Outlet } from "react-router-dom"
import Header from "../components/Header"


const Layout = () => {
  return (
    <div className="pb-4 px-10 md:px-8 lg:px-16 flex flex-col min-h-screen">
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout