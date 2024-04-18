const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const { type } = require('os')
const port = 4000

app.use(express.json());
app.use(cors());

// Database connection with MongoDb

mongoose.connect('mongodb+srv://user1:c6ixinfx@cluster0.gizwbvs.mongodb.net/e-commerce',{
    useNew
})

// API creation
app.get("/" , (req,res)=>
{
    res.send("Express is running")
})

// Image storage 

const storage = multer.diskStorage({
    destination:'./ImagesUpload/Images',
    filename:(req,file,cb)=>
    {
        return cb(null ,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const ImagesUpload = multer ({storage:storage})

app.use('/images',express.static('ImagesUpload/Images'))

app.post("/upload",ImagesUpload.single('product'),(req,res)=>
{
    res.json({
        success: 1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema

const Product = mongoose.model("Product",{
    id:
    {
        type:Number,
        required:true
    },
    name:
    {
        type :String,
        required:true
    },
    image:
    {
        type :String,
        required:true
    },category:
    {
        type :String,
        required:true
    },
    old_price:
    {
        type :Number,
        required:true
    },
    new_price:
    {
        type :Number,
        required:true
    },
    date:
    {
        type : Date,
        default:Date.now
    },
    available:
    {
        type : Boolean,
        default :true
    }

})

app.post('/addproduct',async (req,res)=>
{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let product_a = products.slice(-1);
        let last_product = product_a[0];
        id = last_product.id + 1;
    }
    else
    {
        id = 1
    }
   const product = new Product({
     id:id,
     name:req.body.name,
     image:req.body.image,
     category:req.body.category,
     new_price:req.body.new_price,
     old_price:req.body.old_price,
   });
   console.log(product);
   await product.save();
   console.log("Saved");

   res.json({
    success:true,
    name:req.body.name
   })
})

app.post('/removeproduct' ,async (req,res)=>
{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success : true,
        name : req.body.name
    })
})

app.get('/allproducts',async (req,res)=>
{
    let products = await Product.find({});
    console.log("All products fetched")
    res.send(products)
})

//login user schema

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:
    {
        type:String,
        unique:true
    },
    password:
    {
        type:String
    },
    cartData:
    {
        type:Object
    },
    date:
    {
        type:Date,
        default:Date.now
    }
})


// create endpoint for user

app.post('/signup',async(req,res)=>
{
    let check = await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success : false , erros : "exists"})
    }

    else{
        let cart ={};
        for (let i = 0; i < 300; i++) {
           cart[i] = 0;
            
        }

        const user = new Users({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData : cart
        })

        await user.save()

        const data = {

            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,'secret_ecom')
        res.json({success:true,token})
    }
})



app.post('/login',async (req,res)=>
{
    let user = await Users.findOne({email:req.body.email});
    if(user)
    {
        const passwordCompare = req.body.password === user.password
        if(passwordCompare)
        {
            const data ={
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"password wrong"})
        }
    }
    else
    {
        res.json({success:false,errors:"Wrong emailid"})
    }
})/

app.get('/newcollections',async (req,res)=>
{
    let product = await Product.find({category:"women"});
    let popular_in_women = product.slice(0,4)
    console.log("popular fetched")
    res.send(popular_in_women)
})

app.get('/popularinwomen',async (req,res)=>
{
    let product = await Product.find({});
    let newcollections = product.slice(-8)
    console.log("NewCollection Fetched")
    res.send(newcollections)
})

// middleware to fetch user
const fetchUser = async (req,res,next)=>
{
   const token = req.header('auth-token');
   if(!token)
   {
    res.status(401).send({
        errors: "authenticate"
    })
   }
   else
   {
    try{
        const data = jwt.verify(token , 'secret_ecom')
        req.user = data.user
        next()
    }
    catch(error)
    {
      res.status(401).send({errors:"autehnticate"})
    }
   }
}

app.post('/addtocart' , fetchUser , async (req,res)=>
{
    console.log("added",req.body,req.user)
  let userData = await Users.findOne({_id : req.user.id})
  userData.cartData[req.body.itemId]+=1
  await Users.findOneAndUpdate({_id :req.user.id} ,{cartData :userData.cartData})
  res.send("added")
})

app.post('/removefromcart' , fetchUser , async (req,res)=>
{
  console.log("remove",req.body.itemId)
  let userData = await Users.findOne({_id : req.user.id})
  if(userData.cartData[req.body.itemId] > 0)
  userData.cartData[req.body.itemId]-=1
  await Users.findOneAndUpdate({_id :req.user.id} ,{cartData :userData.cartData})
})


app.post('/getcart' , fetchUser , async (req,res)=>
{
  console.log("GetCart")
  let userData = await Users.findOne({_id : req.user.id})
  res.json(userData.cartData)
})


app.listen(port,(error)=>
{
    if(!error)
    {
        console.log(`Running port at the server ${port}`)
    }

    else
    {
        console.log(error)
    }
})