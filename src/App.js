import { Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignUp';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ConfirmPassword from './pages/ConfirmPassword';
import Activate from './pages/Activate';
import Navbar from './partials/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/ClientList';
import Footer from './partials/Footer';
import Dash from './dash/Dash';
import Calculator from './pages/Calculator';


function App() {
  return (
    <div className='flex flex-col h-screen justify-between bg-body'>
      <header>
        <Navbar />
      </header>
      <main className='mb-auto'>
      <Routes>
        <Route path="/" element={ <Landing /> } />
        <Route path="/signup/" element={ <SignUpForm /> } />
        <Route path="/reset-password/" element={ <ResetPassword /> } />
        <Route path="/reset-password/confirm/:uid/:token" element={ <ConfirmPassword /> } />
        <Route path="/verify/:uid/:token" element={ <Activate /> } />
        <Route path="/login/" element={ <Login /> } />
        <Route path="/dashboard/" element={ <Dashboard /> }>
          <Route path="home" element={<Dash />} />
          <Route path="clients" element={<Dashboard />} />
          <Route path="lists" element={<Dashboard />} />
          <Route path="deals" element={<Dashboard />} />
          <Route path="rates" element={<Dashboard />} />
          <Route path="cards" element={<Dashboard />} />
          <Route path="calculator" element={<Calculator />} />
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
