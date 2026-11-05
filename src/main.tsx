import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { InkProvider } from './lib/ink/react'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><InkProvider><App /></InkProvider></StrictMode>,
)
