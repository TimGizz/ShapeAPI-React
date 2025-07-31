import { useState } from 'react'
import '../components/style/App.css'
import { RouterProvider } from 'react-router-dom'
import '../components/style/_variables.css'
import '../components/style/font.css'
import router from './Router'

function App() {

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
