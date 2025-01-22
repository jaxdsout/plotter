import { Route, Routes } from 'react-router-dom';
import SignUpForm from './auth/SignUp';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import ConfirmPassword from './auth/ConfirmPassword';
import Activate from './auth/Activate';
import Navbar from './components/Navbar';
import Landing from './auth/Landing';
import Dashboard from './dashboard/Dashboard';
import ClientList from './listmaker/PublicList';
import Footer from './components/Footer';
import Dash from './dashboard/Dash';
import Clients from './clients/Clients';
import Lists from './lists/Lists';
import Deals from './deals/Deals';


function App() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <header>
        <Navbar />
      </header>
      <main className='mb-auto'>
      <Routes>
        <Route path="/" element={ <Landing /> }/>
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
      </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
