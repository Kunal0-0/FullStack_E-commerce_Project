import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Footer from './components/footer'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
