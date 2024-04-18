import React, { useEffect, useState } from "react";
import "./ListProduct.css";

const Addproduct = () => {
  const [allproducts, setallproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setallproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);


  const remove_product = async (id)=>
  {
    await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id}),
      })
      await fetchInfo()
  }

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((pro,ind)=>
      {
         return <>
         <div key={ind}className="listproduct-format-main listproduct-format">
          <img src={pro.image} alt="" className="listproduct-product-icon"/>
          <p>{pro.name}</p>
          <p>${pro.old_price}</p>
          <p>${pro.new_price}</p>
          <p>{pro.category}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="times"
          className="listproduct-remoce-icon" width={20} height={20} onClick={()=>
          {
            remove_product(pro.id)
          }}><path fill="#000000" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
         </div><hr />
         </>
      })}
      </div>
    </div>
  );
};

export default Addproduct;
