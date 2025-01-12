import {Link} from "react-router-dom";
import useAuthStore from "../../store/authStore.js";

const AuthHeader = () => {
   const {user} = useAuthStore();

   return (
      <header>
         <nav className="navbar navbar-light">
            <div className="container">
               <a className="navbar-brand" href="/">conduit</a>
               <ul className="nav navbar-nav pull-xs-right">
                  <li className="nav-item">
                     {/*Add "active" class when you're on that page"*/}
                     <a className="nav-link active" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/editor">
                        <i className="ion-compose"></i>&nbsp;New Article
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/settings">
                        <i className="ion-gear-a"></i>&nbsp;Settings
                     </Link>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="/profile/eric-simons">
                        <img src="" className="user-pic"/>
                        {user.username}
                     </a>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
   );
};

export default AuthHeader;