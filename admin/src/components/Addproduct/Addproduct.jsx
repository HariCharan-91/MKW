import React, { useState } from "react";
import "./Addproduct.css";
import upload_area from "../../assets/upload_area.svg";

const Addproduct = () => {
  const [image, setImage] = useState(false);

  const [productd, setproductd] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const Add_product = async() => {
    console.log(productd);
    let responseData;
    let product = productd

    let formData = new FormData()
    formData.append('product',image)

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json'
      },
      body:formData,
    }).then((res)=>res.json()).then((data)=>{responseData=data})

    if(responseData.success)
    {
      product.image = responseData.image_url;
      console.log(product)

      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
      }).then((res)=>res.json()).then((data)=>{
        data.success ? alert('product added') : alert('Failed')
      })
    }
  };
  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setproductd({ ...productd, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-product">
      <div className="addproductd-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          placeholder="Type here"
          name="name"
          value={productd.name}
          onChange={changeHandler}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type Here"
            value={productd.old_price}
            onChange={changeHandler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type Here"
            value={productd.new_price}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          value={productd.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="thumbnail-img"
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          // hidden
          onClick={imagehandler}
        />
      </div>
      <button
        className="addproduct-btn"
        onClick={() => {
          Add_product();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Addproduct;
