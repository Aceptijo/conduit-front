import {Link} from "react-router-dom";

const UnAuthHeader = () => {
   return (
      <header>
         <nav className="navbar navbar-light">
            <div className="container">
               <Link className="navbar-brand" to="/">conduit</Link>
               <ul className="nav navbar-nav pull-xs-right">
                  <li className="nav-item">
                     <Link className="nav-link active" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/login">Log In</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/register">Register</Link>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
   );
};

export default UnAuthHeader;