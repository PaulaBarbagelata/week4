import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import Weather from "./Weather"
import "./weather.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="App">
    <Weather />
    </div>
    
    <div >
        Sourced by Paula Barbagelata <a href="https://github.com/PaulaBarbagelata/week4" target="_blank"  rel="noreferrer">See moore on GitHub</a>
    </div>
  </React.StrictMode>
);

