import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './store/index'
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router basename=''>
          <App />
        </Router>
      </PersistGate>
    </Provider>
);

reportWebVitals();
