import {useState} from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm.jsx";
import useAuthStore from "../store/authStore.js";
import {registerUser} from "../api/auth.js";
import {Link, useNavigate} from "react-router-dom";

const RegisterPage = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const setUser = useAuthStore(state => state.setUser);

   const handleRegister = async (event) => {
      event.preventDefault();
      setError(null);
      setLoading(true);

      try {
         const data = await registerUser(username, email, password)
         setUser(data.user, data.user.token);
         navigate('/');

      } catch (error) {
         setError(error.errors);
         console.error('Ошибка регистрации', error);

      } finally {
         setLoading(false);
      }

   }


   return (
      <div className="auth-page">
         <div className="container page">
            <div className="row">
               <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Register</h1>
                  <p className="text-xs-center">
                     <Link to="/login">Have an account?</Link>
                  </p>

                  {error && <ul className="error-messages">
                     <li>That email is already taken</li>
                  </ul>}


                  <RegisterForm
                     username={username}
                     email={email}
                     password={password}
                     handleRegister={handleRegister}
                     onEmailChange={setEmail}
                     onPasswordChange={setPassword}
                     onUsernameChange={setUsername}
                     loading={loading}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;