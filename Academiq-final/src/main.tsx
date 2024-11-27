import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS (includes Popper.js)


import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import persistor from '../Redux/Persistor';
import store from '../Redux/store/store';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');


createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);