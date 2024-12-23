import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <Router basename=''>
        <App />
      </Router>
    </Provider>
);

reportWebVitals();
