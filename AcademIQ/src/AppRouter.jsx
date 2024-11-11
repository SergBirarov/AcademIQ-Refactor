import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MainLayout from './layouts/MainLayout';
import Courses from './pages/Courses';
import PrivateRoute from './pages/navigation/PrivateRoutes';
import NoMatch from './pages/navigation/NoMatch';

const AppRouter = () => {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />

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
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
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

          {/* Uncomment these private routes if needed */}
          {/* <Route 
            path="/performance" 
            element={
              <PrivateRoute>
                <Performance />
              </PrivateRoute>
            } 
          />
          <Route 
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
