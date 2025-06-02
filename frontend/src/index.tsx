import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import { router } from './router/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
reportWebVitals();
