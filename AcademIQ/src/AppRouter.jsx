import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Performance from './pages/Performance';
import HomeLayout from './layouts/HomeLayout';
import Courses from './pages/Courses';
import ManageHumans from './pages/admin/ManageHumans';
import Tuitions from './pages/admin/Tuitions';
import Calendar from './pages/admin/Calendar';
import GeneralInformation from './pages/admin/GeneralInformation';
import HomeStaff from './pages/admin/HomeStaff';



const AppRouter = () => {

    return (
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/overview" element={<HomeStaff />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/courses" element={<Courses />} />
          <Route path='/manage students and staff' element={<ManageHumans />} />
          <Route path="/tuitions" element={<Tuitions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path='/general information' element={<GeneralInformation />} />
          
        </Route>
      </Routes>
    </Router>
    );
  };

  export default AppRouter;
