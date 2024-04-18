import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addcart from '../../assets/addcart.jpg'
import listcart from '../../assets/listcart.jpg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={addcart} alt=""className='product-icon'/>
            <p>Add product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={listcart} alt=""className='product-icon'/>
            <p>Product list</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
