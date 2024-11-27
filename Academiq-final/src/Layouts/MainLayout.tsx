import React from 'react';
import {  Outlet } from 'react-router-dom';
import HomeLayout from './HomeLayout';
import NavbarComponent from '../Components/common/NavbarComponent';


export default function MainLayout(): JSX.Element {

  return (
    <>
      <NavbarComponent />
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    </>
  );
}
