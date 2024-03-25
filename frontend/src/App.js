import './App.css';
import Header from './partials/Header';
import Footer from './partials/Footer';
import AgentHome from './pages/AgentHome';
import Landing from './pages/Landing';
import ClientForm from './components/ClientForm'
import CreateList from './pages/CreateList';
import AgentForm from './components/AgentForm';

import axios from 'axios';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';

const API_url = 'http://localhost:8000/plotter';

function App() {
  const [agents, setAgents] = useState([1])

  console.log(agents.id)

  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone_number: ''
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clientForm);
  };
  
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
        <Route path="" element={
          <Landing />
        }/>
        <Route path="/signup/" element={
          <AgentForm />
        } />
        <Route path="/login/" element={
          <LoginForm />
        } />
        <Route path="/agent/home" element={
          <AgentHome />
        }/>
        <Route path='/agent/home/create-client' element={
          <ClientForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            clientForm={clientForm}/>
        }/>
        <Route path='/agent/home/create-list' element={
          <CreateList />
        }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
