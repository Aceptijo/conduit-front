import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
   const [userName, setUserName] = useState('')
   const [password, setPassword] = useState('')
   const [email, setEmail] = useState('')

   const navigate = useNavigate()

   const API_URL = 'https://conduit-realworld-example-app.fly.dev/api';

   const registerUser = async (event) => {
      event.preventDefault();
      try {
         await axios.post(`${API_URL}/users`, {
            user: {
               username: userName,
               email: email,
               password: password,
            }
         })

         navigate('/login')

      } catch (error) {
         console.log(error)
      }
   }

   // const getCurrentUser = async (token) => {
   //    try {
   //       const response = await axios.get(`${API_URL}/user`, {
   //          headers: {
   //             Authorization: `Token ${token}`
   //          }
   //       })
   //       console.log(response.data.user)
   //
   //    } catch (error) {
   //       console.log(error)
   //    }
   // }


   return (
      <div className="auth-page">
         <div className="container page">
            <div className="row">
               <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Register</h1>
                  <p className="text-xs-center">
                     <a href="/login">Have an account?</a>
                  </p>

                  {/*<ul className="error-messages">*/}
                  {/*   <li>That email is already taken</li>*/}
                  {/*</ul>*/}

                  <form>
                     <fieldset className="form-group">
                        <input
                           className="form-control form-control-lg"
                           type="text"
                           placeholder="Username"
                           onChange={(event) => setUserName(event.target.value)}
                        />
                     </fieldset>
                     <fieldset className="form-group">
                        <input
                           className="form-control form-control-lg"
                           type="text"
                           placeholder="Email"
                           onChange={(event) => setEmail(event.target.value)}
                        />
                     </fieldset>
                     <fieldset className="form-group">
                        <input
                           className="form-control form-control-lg"
                           type="password"
                           placeholder="Password"
                           onChange={(event) => setPassword(event.target.value)}
                        />
                     </fieldset>
                     <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        onClick={(event) => registerUser(event)}
                     >
                        Register
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;