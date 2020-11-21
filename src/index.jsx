import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './context';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root'),
);

// https://github.com/duiker101/pokemon-type-svg-icons/releases/tag/1.0.0
