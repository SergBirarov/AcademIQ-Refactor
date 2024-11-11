import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom'
import  persistor from  './store/Persistor.js'
import store from './store/store.js'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App.jsx'
import './index.css'

// if(getToken()){
//   store.dispatch(fetchUserData());
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
