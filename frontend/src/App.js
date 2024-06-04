import { Route, Routes } from 'react-router-dom';



import Navbar from './components/Navbar';
import Dashboard from './containers/Dashboard';
import Landing from './containers/Landing';
import SignUpForm from './containers/SignUp';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ConfirmPassword from './containers/ConfirmPassword';
import Activate from './containers/Activate';



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
