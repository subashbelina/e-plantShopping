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

const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Failed to render application:', error);
    // Display error to user
    document.body.innerHTML = `
      <div style="color: red; padding: 20px;">
        <h1>Error Loading Application</h1>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
        <pre>${error.message}</pre>
      </div>
    `;
  }
};

// Ensure DOM is fully loaded before rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
