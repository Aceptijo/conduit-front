import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/LoginPage.jsx";
import RegisterPage from "../../pages/RegisterPage.jsx";
import Main from "../Main/Main.jsx";
import Settings from "../Settings/Settings.jsx";
import ProtectedRoute from "../../pages/ProtectedRoute.jsx";
import useAuthStore from "../../store/authStore.js";
import Profile from "../../pages/Profile/Profile.jsx";

const AppRouter = () => {
   const {user} = useAuthStore();

   return (
      <Routes>
         <Route
            path="/login"
            element={
               user ? <Navigate to='/'/> : <LoginPage/>
            }
         />
         <Route
            path="/register"
            element={
               user ? <Navigate to='/'/> : <RegisterPage/>
            }
         />
         <Route path="/" element={<Main/>}/>
         <Route path="/profile/:username" element={<Profile/>}/>


         <Route path="/settings" element={
            <ProtectedRoute>
               <Settings/>
            </ProtectedRoute>}
         />


         <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
   );
};

export default AppRouter;