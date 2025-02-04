import './App.css';
import Footer from './components/Footer/Footer.jsx';
import AppRouter from './components/AppRouter/AppRouter.jsx';
import UnAuthHeader from './components/Header/UnAuthHeader.jsx';
import useAuthStore from './store/authStore.js';
import AuthHeader from './components/Header/AuthHeader.jsx';
import { useEffect } from 'react';
import GlobalSnackbar from './components/GlobalSnackbar/GlobalSnackbar.jsx';

function App() {
  const { user, isLoading, restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <>
        <GlobalSnackbar />
        {user ? <AuthHeader /> : <UnAuthHeader />}
        <AppRouter />
        <Footer />
      </>
    </div>
  );
}

export default App;
