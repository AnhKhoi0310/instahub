// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import  {Amplify} from 'aws-amplify';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
// import amplifyconfig from './amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);