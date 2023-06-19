
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserProvider from "../context/UserContext";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";

axios.defaults.baseURL = 'http://localhost:8000/api/v1' 
axios.defaults.withCredentials = true

const App = () => {
  

  
return (
    
    <UserProvider>

      <Routes>
        <Route path="/" element={ <Layout /> }  >
          <Route index element={ <MainPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/account/:subpage?"  element={ <AccountPage /> } /> {/*question mark para evitar error, porque en el primer renderizado no habrá algun param en la ruta */}
          <Route path="/account/:subpage/:action"  element={ <AccountPage /> } />
          <Route path="/account/:subpage/:idpage"  element={ <AccountPage /> } />
          <Route path="/place/:placeid" element={ <PlaceDetailsPage /> } />
        </Route>
      </Routes>

    </UserProvider>
  );
};
export default App;
