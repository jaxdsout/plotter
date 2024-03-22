import './App.css';
import Header from './partials/Header';
import Footer from './partials/Footer';
import AgentHome from './pages/AgentHome';
import ClientForm from './components/ClientForm'
import ListForm from './components/ListForm';

import axios from 'axios';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_url = 'http://localhost:8000/plotter';

function App() {
  const [agents, setAgents] = useState([])
  
  useEffect(() => {
    async function getAgents() {
      try {
        const response = await axios.get(`${API_url}/agents/`);
        const data = response.data;
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents', error);
      } 
    }

    getAgents()
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={
          <AgentHome />
        }/>
        <Route path='/clients/create/' element={
          <ClientForm />
        }/>
        <Route path='/lists/create/' element={
          <ListForm />
        }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
