import { Route, Routes } from 'react-router-dom';



import Navbar from './components/Navbar';
import Dashboard from './dashboard/Dashboard';
import Landing from './components/Landing';
import SignUpForm from './auth/SignUp';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import ConfirmPassword from './auth/ConfirmPassword';
import Activate from './auth/Activate';
import ClientDetail from './clients/ClientDetail';


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
        <Route path="/dashboard/client/:id" element={ <ClientDetail /> } />
      </Routes>
    </div>
  );
}

export default App;
