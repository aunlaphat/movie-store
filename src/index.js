import React from 'react';
import ReactDOM from 'react-dom/client';
import { App as AntdApp } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './styles/main.css';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
    theme={{
      token: {
        fontFamily: `'Noto Sans Thai', 'Roboto', sans-serif`,
      },
    }}
  >
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
