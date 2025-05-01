import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './index.css'

// Add error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Add logging
console.log('Application starting...');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log('Root element found:', document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  console.log('Application rendered successfully');
} catch (error) {
  console.error('Error rendering application:', error);
}
