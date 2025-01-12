import useAuthStore from "../store/authStore.js";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
   const {user, isLoading} = useAuthStore();

   if (isLoading) {
      return <div>Loading...</div>
   }

   return user ? children : <Navigate to='/login'/>
}

export default ProtectedRoute;