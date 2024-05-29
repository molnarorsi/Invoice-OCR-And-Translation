import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './pages/App/App';
import { BrowserRouter } from 'react-router-dom';
import { OCRContextProvider } from './context/ocr-context';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OCRContextProvider>
     <BrowserRouter>
      <App/>
     </BrowserRouter>
    </OCRContextProvider>
  </React.StrictMode>
);
