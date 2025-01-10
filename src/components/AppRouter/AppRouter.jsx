import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../Authentication/Login.jsx";
import Register from "../../Authentication/Register.jsx";
import Main from "../Main/Main.jsx";
import Settings from "../Settings/Settings.jsx";

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/settings" element={<Settings/>}/>
         <Route path="/" element={<Main/>}/>
         <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
   );
};

export default AppRouter;