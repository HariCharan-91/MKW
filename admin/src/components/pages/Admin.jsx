import React from 'react'
import './Admin.css'
import Sidebar from '../Sidebar/Sidebar'
import { Route } from 'react-router-dom'
import Addproduct from '../Addproduct/Addproduct'
import ListProduct from '../ListProduct/ListProduct'
import {Routes} from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin
