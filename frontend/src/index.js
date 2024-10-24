import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import { store } from './Redux/reducers';
import {Provider} from "react-redux"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

    
    <BrowserRouter>
        <App />
        <ToastContainer autoClose={1000}/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
