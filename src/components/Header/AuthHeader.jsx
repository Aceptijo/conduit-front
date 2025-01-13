import {Link} from "react-router-dom";
import useAuthStore from "../../store/authStore.js";

const AuthHeader = () => {
   const {user} = useAuthStore();

   return (
      <header>
         <nav className="navbar navbar-light">
            <div className="container">
               <Link className="navbar-brand" to="/">conduit</Link>
               <ul className="nav navbar-nav pull-xs-right">
                  <li className="nav-item">
                     {/*Add "active" class when you're on that page"*/}
                     <Link className="nav-link active" to="/">Home</Link>
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
                     <Link className="nav-link" to={`/profile/${user.username}`}>
                        <img src="" className="user-pic"/>
                        {user.username}
                     </Link>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
   );
};

export default AuthHeader;