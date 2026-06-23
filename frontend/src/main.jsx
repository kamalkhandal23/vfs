import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { bookingStore } from './store/bookingStore'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={bookingStore}>
      <App />
    </Provider>
  </StrictMode>,
)
