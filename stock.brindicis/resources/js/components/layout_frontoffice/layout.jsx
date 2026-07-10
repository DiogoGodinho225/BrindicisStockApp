import React from 'react';
import TopBar from '../topbar';
import Footer from '../footer';
import ProductZone from './product_zone';

const Layout = ({ 
    children, 
    searchItem, 
    setSearchItem, 
    productId, 
    showView, 
    setShowView,
    showCreateReservation,
    setShowCreateReservation,
    showReservations,
    setShowReservations,
    setStatus,
    refreshIndex,
    showMessage,
    setShowMessage,
}) => {
  return (
    <div  className="layout-container">
      <TopBar searchItem={searchItem} setSearchItem={setSearchItem}/>
      <div style={{ display: 'flex' }} className="d-flex">
        <div className="content-frontoffice-container">
          {children}
        </div>
        <ProductZone 
            productId={productId} 
            showView={showView} 
            setShowView={setShowView}
            showCreateReservation={showCreateReservation}
            setShowCreateReservation={setShowCreateReservation}
            showReservations={showReservations}
            setShowReservations={setShowReservations}
            setStatus={setStatus}
            refreshIndex={refreshIndex}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
