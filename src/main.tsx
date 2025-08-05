import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { createConfig } from 'shape-rq'

createConfig({
  APIs:{
    PrivateAPI:{
      baseUrl: import.meta.env.VITE__BASE_URL
    },
    MemeAPI:{
      baseUrl: import.meta.env.VITE__MEME_URL
    },
    AuthAPI:{
      baseUrl: import.meta.env.VITE__AUTH_URL
    }
  },
  lang:'ru',
  debug: true
})

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
