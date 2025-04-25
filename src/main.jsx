import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Home, Signup, Login, Allpost, Addpost, Post, Editpost, Protected, LoaderAnimation } from "./components/index.js"
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Errorpage from './pages/Errorpage'

const AddPostPage = lazy(() => import('./pages/Addpost.jsx'));

const router = createBrowserRouter (
  createRoutesFromElements(
  <Route path ='/' element={<App />}>
    <Route path ='' element={<Home/>}/>
    <Route path ='login' element={
      <Protected authentication={false}>
        <Login/>
      </Protected>
      }/>
    <Route path ='signup' element={
      <Protected authentication={false}>
        <Signup/>
      </Protected>
      }/>
    <Route path ='allpost' element={
      <Protected authentication={true}>
        <Allpost/>
      </Protected>
      }/>
    <Route path ='addpost' element={
      <Protected authentication={true}>
        <Suspense fallback={<LoaderAnimation />}>
          <AddPostPage/>
        </Suspense>
      </Protected>
      }/>
    <Route path ='posts/:slug' element={
      <Protected authentication={true}>
        <Post/>
      </Protected>
      } errorElement={<Errorpage/>}/> {/* Navigate from Postform or View from Postcard */}
    <Route path ='editpost/:slug' element={
      <Protected authentication={true}>
        <Editpost/>
      </Protected>
      } errorElement={<Errorpage/>} /> {/* Navigate from Post */}
  </Route>
  )
 )


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  
)
