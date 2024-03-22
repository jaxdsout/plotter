import './App.css';
import Header from './partials/Header';
import Footer from './partials/Footer';

import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import React, {useState, useEffect, useCallback} from 'react';
// import {Route, Routes, useNavigate} from 'react-router-dom';

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
      <div>
      {agents.map((agent) => (
        <ul key={agent.id}>
          <li className="">
            <Link to={`/agents/${agent.id}`}>{agent.first_name}</Link>
          </li>
        </ul>
      ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
