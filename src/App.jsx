import './App.css'
import Footer from "./components/Footer/Footer.jsx";
import AppRouter from "./components/AppRouter/AppRouter.jsx";
import UnAuthHeader from "./components/Header/UnAuthHeader.jsx";
import useAuthStore from "./store/authStore.js";
import AuthHeader from "./components/Header/AuthHeader.jsx";

function App() {
   const {isAuth} = useAuthStore();

   return (
      <>
         {isAuth ? <AuthHeader/> : <UnAuthHeader/>}
         <AppRouter/>
         <Footer/>
      </>
   )
}

export default App
