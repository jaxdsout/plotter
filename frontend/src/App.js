import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Route, Routes } from 'react-router-dom';


import Header from './partials/Header';
import Footer from './partials/Footer';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import ClientForm from './components/ClientForm'
import CreateList from './pages/CreateList';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';


function App() {


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
          <LoginForm />
        } />
        <Route path="/dashboard/" element={
          <Dashboard />
        }/>
        <Route path='/agent/home/create-client' element={
          <ClientForm />
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
