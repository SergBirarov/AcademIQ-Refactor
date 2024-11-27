import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Home from './Pages/Home';
// import HomeStaff from './pages/admin/HomeStaff';
// import Profile from './pages/Profile';
import MainLayout from './Layouts/MainLayout';
import Courses from './Pages/Courses';
import PrivateRoute from '../Redux/PrivateRoutes';
import NoMatch from './Pages/navigation/NoMatch';
import TestPage from './Pages/TestPage';


const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Routes within the Main Layout */}
      <Route element={<MainLayout />}>
        {/* Private Routes */}
         <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/staff-home"
          element={
            <PrivateRoute>
              <HomeStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
        
       

        {/* Uncomment these private routes if needed */}
         <Route
            path="/test"
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />
          {/*<Route
            path="/manage-students-and-staff"
            element={
              <PrivateRoute>
                <ManageHumans />
              </PrivateRoute>
            }
          />
          <Route
            path="/tuitions"
            element={
              <PrivateRoute>
                <Tuitions />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/general-information"
            element={
              <PrivateRoute>
                <GeneralInformation />
              </PrivateRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <PrivateRoute>
                <Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          /> */}
      </Route>

      {/* Handle unmatched routes */}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AppRouter;
