import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { makeServer } from './makeServer';
import * as serviceWorker from './serviceWorker';

if (process.env.REACT_APP_MOCK_SERVER) {
  makeServer();
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
