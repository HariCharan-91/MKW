import React from 'react'
import './NewCollections.css'
import Item from '../Items/item'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Newcollections() {
  const [new_collection ,setNew_collection] = useState([])

  useEffect(()=>
{
  fetch("http://localhost:4000/newcollections")
        .then((res) => res.json())
        .then((data) => {
          setNew_collection(data);
        });
},[])
  return (
    <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((item,index)=>
        {
            return <Item key ={index} id={item.id} name ={item.name} image = {item.image} new_price = {item.new_price} old_price = {item.old_price}/>
        })}
        </div>
    </div>
  )
}
