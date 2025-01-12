import './App.css'
import Footer from "./components/Footer/Footer.jsx";
import AppRouter from "./components/AppRouter/AppRouter.jsx";
import UnAuthHeader from "./components/Header/UnAuthHeader.jsx";
import useAuthStore from "./store/authStore.js";
import AuthHeader from "./components/Header/AuthHeader.jsx";
import {useEffect} from "react";

function App() {
   const {user, isLoading, restoreSession} = useAuthStore();

   useEffect(() => {
      restoreSession();
   }, [restoreSession]);

   if (isLoading) {
      return <div>Loading...</div>
   }

   return (
      <>
         {user ? <AuthHeader/> : <UnAuthHeader/>}
         <AppRouter/>
         <Footer/>
      </>
   )
}

export default App
