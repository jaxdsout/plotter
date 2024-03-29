import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


import Header from './partials/Header';
import Footer from './partials/Footer';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import ClientForm from './components/ClientForm'
import CreateList from './pages/CreateList';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

const api_url = process.env.REACT_APP_APIURL

function App() {
  const navigate = useNavigate()

  const [login, setLogin] = useState({
      email: '',
      password: '',
  })

  const [agent, setAgent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    trec_id: '',
    id: ''
  })

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
      e.preventDefault();
      console.log(login)
      try {
          const response = await axios.post(`${api_url}/login/`, JSON.stringify(login), {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.status === 200) {
              const auth = await axios.post(`${api_url}/auth/`)
              console.log('Login successful');
              localStorage.setItem('token', login.email);
              navigate('/dashboard/');
          } else {
              console.error('Login failed');
          }
      } catch (error) {
          console.error('Error:', error.message);
      }
  }


  const handleDashboard = async () => {
    try {
        const token = localStorage.getItem('token');
        const encoded_token = encodeURIComponent(token)
        const response = await axios.get(`${api_url}/agents/?email=${encoded_token}`);
        console.log(response.data[0])
        if (response.data && response.data.length === 1) {
          setAgent(response.data[0])
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }


  return (
    <div className='main_shell'>
      <Header />
      <Routes>
        <Route path="" element={
          <Landing />
        }/>
        <Route path="/signup/" element={
          <SignUpForm />
        } />
        <Route path="/login/" element={
          <LoginForm 
            handleChange={handleChange}
            handleLogin={handleLogin}
          />
        } />
        <Route path="/dashboard/" element={
          <Dashboard 
            agent={agent}
            handleDashboard={handleDashboard}
          />
        }/>
        <Route path='/dashboard/create-client/' element={
          <ClientForm
             agent={agent}
            />
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
