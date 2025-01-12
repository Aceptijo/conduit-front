import {Link} from "react-router-dom";
import {useState} from "react";
import useAuthStore from "../store/authStore.js";
import LoginForm from "../components/LoginForm/LoginForm.jsx";
import {loginUser} from "../api/auth.js";

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const setUser = useAuthStore(state => state.setUser);

   const handleLogin = async (event) => {
      event.preventDefault();
      setError(null);
      setLoading(true);

      try {
         const data = await loginUser(email, password);
         setUser(data.user, data.user.token);
         window.location.href = '/';

      } catch (error) {
         setError(error.errors);
         console.error("Ошибка авторизации", error);

      } finally {
         setLoading(false);
      }

   }

   return (
      <div className="auth-page">
         <div className="container page">
            <div className="row">
               <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Sign in</h1>
                  <p className="text-xs-center">
                     <Link to="/register">Need an account?</Link>
                  </p>
                  {error && <ul className="error-messages">
                     <li>Error</li>
                  </ul>}


                  <LoginForm
                     email={email}
                     password={password}
                     onEmailChange={setEmail}
                     onPasswordChange={setPassword}
                     handleLogin={handleLogin}
                     loading={loading}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;