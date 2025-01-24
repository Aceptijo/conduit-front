import { NavLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore.js';

const AuthHeader = () => {
  const { user } = useAuthStore();

  return (
    <header>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/*Add "active" class when you're on that page"*/}
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editor">
                <i className="ion-compose"></i>&nbsp;New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <i className="ion-gear-a"></i>&nbsp;Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/profile/${user.username}`}>
                <img src="" className="user-pic" />
                {user.username}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;
