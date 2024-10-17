import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Performance from './pages/Performance';
import HomeLayout from './layouts/HomeLayout';



const AppRouter = () => {

    return (
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/performance" element={<Performance />} />
          
        </Route>
      </Routes>
    </Router>
    );
  };

  export default AppRouter;
