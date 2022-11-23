const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const productController = require('./controllers/product-list.controller')
const categoryController = require('./controllers/category-list.controller')
let port = process.env.PORT || 7800;
let cors = require('cors')


app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cors())
app.use('/productdetails',productController)
app.use('/categorydetails',categoryController)


app.get('/', (req,res)=>{
    res.send({
        message:'Welcome to AmazonApi',
        status:200
    })
})

app.listen(port,()=>{
    console.log('server has started via port:',port)
})