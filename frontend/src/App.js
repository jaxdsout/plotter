import { Route, Routes } from 'react-router-dom';



import Header from './fragments/Header';
import Dashboard from './containers/Dashboard';
import Landing from './fragments/Landing';
import SignUpForm from './containers/SignUp';
import Login from './containers/Login';



function App() {

  return (
    <div className='root'>
      <Header />
      <Routes>
        <Route path="" element={
          <Landing />
        }/>
        <Route path="/signup/" element={
          <SignUpForm />
        } />
        <Route path="/login/" element={ <Login /> } />
        <Route path="/dashboard/" element={
          <Dashboard />
        }/>
      </Routes>
    </div>
  );
}

export default App;
