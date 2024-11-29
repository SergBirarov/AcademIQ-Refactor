import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Home from './Pages/Home';
import HomeStaff from './Pages/admin/HomeStaff';
// import Profile from './pages/Profile';
import MainLayout from './Layouts/MainLayout';
import Courses from './Pages/Courses';
import PrivateRoute from '../Redux/PrivateRoutes';
import NoMatch from './Pages/navigation/NoMatch';
import ManageCourses from './Pages/admin/ManageCourses';
import StudentManagement from './Pages/admin/StudentManagement';
import Schedules from './Pages/students/Schedules';
import Assignments from './Pages/students/Assignments';


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
         <Route
          path="/home-staff"
          element={
            <PrivateRoute>
              <HomeStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-courses"
          element={
            <PrivateRoute>
              <ManageCourses />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
        
           <Route
            path="/manage-students"
            element={
              <PrivateRoute>
                <StudentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <PrivateRoute>
                <Schedules />
              </PrivateRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <PrivateRoute>
                <Assignments />
              </PrivateRoute>
            }
          />
         {/* <Route
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
