import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';
import Todo from './components/todo/todo';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/todo" element={<Todo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
