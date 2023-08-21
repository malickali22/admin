import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import ViewUser from './pages/ViewUser.jsx';
import Signin from './pages/Login.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import ViewServices from './pages/ViewServices.jsx';
import ViewAds from './pages/ViewAds.jsx';
import Ad from './pages/Ad.jsx';
import  UserProfile  from './pages/UserProfile.jsx';
import Blockeduser from './pages/Blockeduser.jsx';
import Report from './pages/Reports.jsx'
import HomePageImage from './pages/HomePageImage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ViewContactus from './pages/ViewContactus.jsx'
function AppLayout({ children }) {
  return <div className="d-flex">{children}</div>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="d-flex">
          <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}  />
          <Routes>
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/viewads" />
                ) : (
                  <AppLayout>
                    <Signin onLogin={() => setIsLoggedIn(true)} />
                  </AppLayout>
                )
              }
            />
             <Route
              path="/dashboard"
              element={
                isLoggedIn ? (

                    <Dashboard />

                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
             <Route
              path="/homeimage"
              element={
                isLoggedIn ? (
                 
                    <HomePageImage />
              
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/viewusers"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <ViewUser />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/viewservices"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <ViewServices />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/viewads"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <ViewAds />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/userprofile/:id"
              element={
                isLoggedIn ? (
                  
                    <UserProfile />

                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/ad/:id"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <Ad />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/reports"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <Report />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
             <Route
              path="/blockeduser"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <Blockeduser />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />

<Route
              path="/contactus"
              element={
                isLoggedIn ? (
                  <AppLayout>
                    <ViewContactus />
                  </AppLayout>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            {/* Add other route components here */}
            
            {/* Default catch-all route */}
            <Route
              path="/*"
              element={
                isLoggedIn ? (
                  <Navigate to="/viewads" />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
