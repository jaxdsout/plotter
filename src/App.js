import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpForm from './auth/SignUp';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import ConfirmPassword from './auth/ConfirmPassword';
import Activate from './auth/Activate';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './dashboard/Dashboard';
import ClientList from './listmaker/ClientList';


function App() {
  return (
    <Router>
    <div className='root'>
      <Navbar />
      <Routes>
        <Route path="/home/" element={ <Landing /> }/>
        <Route path="/signup/" element={ <SignUpForm /> } />
        <Route path="/reset-password/" element={ <ResetPassword /> } />
        <Route path="/password/reset/confirm/:uid/:token" element={ <ConfirmPassword /> } />
        <Route path="/activate/:uid/:token" element={ <Activate /> } />
        <Route path="/login/" element={ <Login /> } />
        <Route path="/dashboard/" element={ <Dashboard /> }/>
        <Route path="/list/:uuid/" element={ <ClientList /> } />
        <Route path="*" element={<Navigate to="/home/" replace />} />
      </Routes>
    </div>
    </Router>

  );
}

export default App;
