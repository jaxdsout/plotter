import { Route, Routes } from 'react-router-dom';



import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';


function App() {

  return (
    <div className='container-lg --bs-secondary-bg --bs-secondary-color-rgb'>
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
      </Routes>
    </div>
  );
}

export default App;
