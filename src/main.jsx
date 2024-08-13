import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Home, Login, Signup} from "./components/index.js"
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter (
  createRoutesFromElements(
  <Route path ='/' element={<App />}>
    <Route path ='' element={<Home/>}/>
    <Route path ='login' element={<Login/>}/>
    <Route path ='signup' element={<Signup/>}/>
    {/* <Route path ='allpost' element={<Allpost/>}/>
    <Route path ='addpost' element={<Addpost/>}/> */}
  </Route>
  )
 )


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
