import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/arrow'

export default function Breadcrums(props) {
    const {product} = props;
  return (
    <div className='breadcrum'>
      HOME{arrow_icon } SHOP {arrow_icon } {product.category} {arrow_icon }{product.name}
    </div>
  )
}
