import { createRoot } from 'react-dom/client';
import App from './App';

// Check if the root element exists before rendering
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found');
}
