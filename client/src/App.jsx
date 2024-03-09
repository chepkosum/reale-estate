import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'

const App = () => {
  return (
    <BrowserRouter>
       <Header/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<PrivateRoute />}>
               <Route path='/profile' element={<Profile/>}/>
               <Route path='/create-listing' element={<CreateListing/>}/>
               <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
        </Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App