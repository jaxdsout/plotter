import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpForm from './auth/SignUp';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import ConfirmPassword from './auth/ConfirmPassword';
import Activate from './auth/Activate';
import Navbar from './home/Navbar';
import Landing from './home/Landing';
import Dashboard from './dashboard/Dashboard';
import ClientList from './listmaker/PublicList';
import Footer from './home/Footer';
import Dash from './dashboard/Dash';
import Clients from './clients/Clients';
import Lists from './lists/Lists';
import Deals from './deals/Deals';


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
        <Route path="/verify/:uid/:token" element={ <Activate /> } />
        <Route path="/login/" element={ <Login /> } />
        <Route path="/dashboard/" element={ <Dashboard /> }>
          <Route path="home" element={<Dash />} />
          <Route path="clients" element={<Clients />} />
          <Route path="lists" element={<Lists />} />
          <Route path="deals" element={<Deals />} />
        </Route>
        <Route path="/list/:uuid/" element={ <ClientList /> } />
        <Route path="*" element={<Navigate to="/home/" replace />} />
      </Routes>
      <Footer />
    </div>
    </Router>

  );
}

export default App;
