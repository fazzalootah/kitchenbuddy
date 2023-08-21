import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import {ProtectedRoute} from "./ProtectedRoute.js";
import { UserAuthContextProvider } from "./UserAuthContext";
import Nav from './components/Navbar';

function App() {
  return (
    <UserAuthContextProvider>
    <Router>
        <Routes>
        <Route path="/" element={<Nav />} >
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
        </Routes>
    </Router>
    </UserAuthContextProvider>
  );
}

export default App;
