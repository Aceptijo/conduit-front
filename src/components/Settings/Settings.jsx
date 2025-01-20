import useAuthStore from "../../store/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const Settings = () => {
  const {user, setUser, clearUser, token} = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    image: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        image: user.image || '',
        password: '',
      })
    }
  }, [user]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {};

    updatedData.username = formData.username ?? '';
    updatedData.email = formData.email ?? '';
    updatedData.password = formData.password ?? '';
    updatedData.bio = formData.bio ?? '';
    updatedData.image = formData.image ?? '';

    try {
      const response = await axiosInstance.put('/user', {
        user: updatedData,
      })
      const updatedUser = response.data.user;
      setUser(updatedUser, token);
      navigate(`/profile/${updatedUser.username}`)
    } catch (err) {
      console.error('Ошибка обновления профиля: ', err);
      setError('Не удалось обновить профиль. Проверьте данные и попробуйте снова.')
    }
  }

  const handleLogout = () => {
    clearUser();
    navigate('/')
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {error && (
              <ul className="error-messages">
                <li>{error}</li>
              </ul>
            )}


            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name='image'
                    value={formData.image}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name='username'
                    placeholder="Your Name"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    name='bio'
                    placeholder="Short bio about you"
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    name='email'
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    name='password'
                    type="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type='submit'>
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr/>
            <button onClick={handleLogout} className="btn btn-outline-danger">Or click here to
              logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;