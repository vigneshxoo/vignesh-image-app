import './App.css';
import { Login } from './login/Login';
import { Signup } from './login/Signup';
import { Home } from './Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import { Profile } from './Home/Profile';
import { ALLImages } from './Home/Allimage';

function App() {
  // Initialize auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Callback to update authentication after login/signup
  const handleAuthSuccess = () => setIsAuthenticated(true);

  // Callback for logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/home" /> :
            <Login onAuthSuccess={handleAuthSuccess} />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/home" /> :
            <Signup onAuthSuccess={handleAuthSuccess} />
        } />
        <Route path="/home" element={
          isAuthenticated ? <Home onLogout={handleLogout} /> :
            <Navigate to="/login" />
        } />
        <Route path="*" element={
          isAuthenticated ? <Navigate to="/home" /> :
            <Navigate to="/login" />
        } />
        <Route path="/Profile" element={
          isAuthenticated ? <Profile /> :
            <Navigate to="/login" />
        } />
        <Route path="/all" element={
          isAuthenticated ? <ALLImages /> :
            <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
