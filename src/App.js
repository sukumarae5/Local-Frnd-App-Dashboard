import React from 'react'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes/AppRouter'

const App = () => {
  return (
    <div >
      <RouterProvider router={AppRouter}/>
    </div>
  )
}

export default App
