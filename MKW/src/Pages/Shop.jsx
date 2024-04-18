import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import Newcollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'


export default function Shop() {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Newcollections/>
      <NewsLetter/>
     
    </div>
  )
}
