import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import useAuthStore from "../store/authStore.js";

const Login = () => {

   const setUser = useAuthStore(state => state.setUser);

   const API_URL = 'https://conduit-realworld-example-app.fly.dev/api'

   const [loginEmail, setLoginEmail] = useState('');
   const [loginPass, setLoginPass] = useState('');
   const navigate = useNavigate()

   const handleLogin = async (event) => {
      event.preventDefault()

      try {
         const response = await axios.post(`${API_URL}/users/login`, {
            user: {
               email: loginEmail,
               password: loginPass
            }
         })
         const user = response.data;
         setUser(user);
         navigate('/')

      } catch (error) {
         console.log(error)
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

                  {/*<ul className="error-messages">*/}
                  {/*   <li>That email is already taken</li>*/}
                  {/*</ul>*/}

                  <form>
                     <fieldset className="form-group">
                        <input
                           onChange={(event) => setLoginEmail(event.target.value)}
                           className="form-control form-control-lg"
                           type="text"
                           placeholder="Email"
                        />
                     </fieldset>
                     <fieldset className="form-group">
                        <input
                           onChange={(event) => setLoginPass(event.target.value)}
                           className="form-control form-control-lg"
                           type="password"
                           placeholder="Password"
                        />
                     </fieldset>
                     <button
                        onClick={(event) => handleLogin(event)}
                        className="btn btn-lg btn-primary pull-xs-right"
                     >
                        Login
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;