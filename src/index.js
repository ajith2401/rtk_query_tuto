import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='flex justify-center items-center min-h-screen bg-slate-600'>
    <div className='w-1/2 max-w-xl'>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </div>
);