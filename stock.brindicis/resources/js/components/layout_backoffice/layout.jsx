import React from 'react';
import TopBar from '../topbar';
import SideBar from './sidebar';
import Footer from '../footer';

const Layout = ({ children, searchItem, setSearchItem, updateStock, getRecentReservations, updateIndex }) => {

  return (
    <div className="layout-container">
      <TopBar searchItem={searchItem} setSearchItem={setSearchItem} />
      <div className="d-flex">
        <SideBar updateStock={updateStock} getRecentReservations={getRecentReservations} updateIndex={updateIndex} />
        <div className="content-backoffice-container">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
