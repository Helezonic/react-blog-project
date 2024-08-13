
//import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
    <div className='bg-blue-300 h-screen'>
    <Header/>
      <div className='p-4'>
        <Outlet/>
      </div>
    
    <Footer/>
    </div>


    </>
  )
}

export default App
