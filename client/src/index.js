import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Opinet from './service/opinet.js';

const opinet = new Opinet();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App opinet={opinet} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
