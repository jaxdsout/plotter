import { Route, Routes } from 'react-router-dom';

import SignUpForm from './auth/SignUp';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import ConfirmPassword from './auth/ConfirmPassword';
import Activate from './auth/Activate';
import Navbar from './home/Navbar';
import Landing from './home/Landing';
import Dashboard from './dashboard/Dashboard';


function App() {
  return (
    <div className='root'>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Landing /> }/>
        <Route path="/signup/" element={ <SignUpForm /> } />
        <Route path="/reset-password/" element={ <ResetPassword /> } />
        <Route path="/password/reset/confirm/:uid/:token" element={ <ConfirmPassword /> } />
        <Route path="/activate/:uid/:token" element={ <Activate /> } />
        <Route path="/login/" element={ <Login /> } />
        <Route path="/dashboard/" element={ <Dashboard /> }/>
      </Routes>
    </div>
  );
}

export default App;
