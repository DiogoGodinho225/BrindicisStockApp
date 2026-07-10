import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFrontOffice from './pages/auth/login_frontoffice'; 
import LoginBackOffice from './pages/auth/login_backoffice';
import Dashboard from './pages/backoffice/Dashboard/dashboard';
import PrivateBoRoute from './components/utils/private_bo_route';
import PrivateFoRoute from './components/utils/private_fo_route';
import CategoriesIndex from './pages/backoffice/Categories/index';
import StockIndex from './pages/backoffice/Stock/index';
import StockCreate from './pages/backoffice/Stock/create';
import StockUpdate from './pages/backoffice/Stock/update';
import Index from './pages/frontoffice/products/index';
import ReservationsIndex from './pages/backoffice/Reservations/index';

const App = () => {

    const privateBoRoutes = [
        { path: '/dashboard', component: <Dashboard /> },
        { path: '/categories', component: <CategoriesIndex /> },
        { path: '/inventory', component: <StockIndex /> },
        { path: '/create-product', component: <StockCreate />},
        { path: '/edit-product/:id', component: <StockUpdate />},
        { path: '/reservations', component: <ReservationsIndex/> }
    ];
    const privateFoRoutes = [
        { path: '/index', component: <Index />},
    ];

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginFrontOffice />} />
                <Route path="/stock" element={<LoginBackOffice />} />
                
                {privateBoRoutes.map((route, index) => (
                    <Route 
                        key={index} 
                        path={route.path} 
                        element={
                            <PrivateBoRoute>
                                {route.component}
                            </PrivateBoRoute>
                        } 
                    />
                ))}

                {privateFoRoutes.map((route, index) => (
                    <Route 
                        key={index} 
                        path={route.path} 
                        element={
                            <PrivateFoRoute>
                                {route.component}
                            </PrivateFoRoute>
                        } 
                    />
                ))}
            </Routes>
        </Router>
    );
};

export default App;
