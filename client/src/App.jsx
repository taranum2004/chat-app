import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from "react-hot-toast";
import { AuthContext } from '../context/AuthContext';

const App = () => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-white text-2xl p-10">
        ⏳ Checking authentication...
      </div>
    );
  }

  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain min-h-screen">


      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
