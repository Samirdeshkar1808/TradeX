import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './index.css'
import Landing from './landingPage/Landing.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import WatchListPage from './WatchList/WatchListPage.jsx'
import OrderPage from './Order/OrderPage.jsx'
import HoldingsPage from './Holdings/HoldingsPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from './landingPage/Login.jsx'
import Signup from './landingPage/signup.jsx'
import NotFound from './NotFound.jsx'
import ProfilePage from './about/ProfilePage.jsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup/>} />



        <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>

        <Route path='/watchlist' element={<ProtectedRoute> <WatchListPage/> </ProtectedRoute>} />

        <Route path='/orders' element = {<ProtectedRoute> <OrderPage/> </ProtectedRoute>} />
       
        <Route path='/holdings' element = {<ProtectedRoute> <HoldingsPage/> </ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />

        <Route path='/about' element={<ProfilePage/>} />
   

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    
    </BrowserRouter>
  
)
