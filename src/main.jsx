import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Home, Signup, Login, Allpost, Addpost, Post, Editpost } from "./components/index.js"
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter (
  createRoutesFromElements(
  <Route path ='/' element={<App />}>
    <Route path ='' element={<Home/>}/>
    <Route path ='login' element={<Login/>}/>
    <Route path ='signup' element={<Signup/>}/>
    <Route path ='allpost' element={<Allpost/>}/>
    <Route path ='addpost' element={<Addpost/>}/>
    <Route path ='posts/:slug' element={<Post/>}/> {/* Navigate from Postform or View from Postcard */}
    <Route path ='edit/:slug' element={<Editpost/>}/> {/* Navigate from Post */}
  </Route>
  )
 )


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  
)
