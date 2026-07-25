import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import BookResults from './pages/BookResults';
import ParticipantDetails from './pages/ParticipantDetails';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:slug" element={<BookResults />} />
            <Route path="/participant/:participantId" element={<ParticipantDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 