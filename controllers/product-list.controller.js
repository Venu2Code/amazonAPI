const express = require('express')
const productRouter = express.Router();
// const client = require('../db/config')
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://test:test123@cluster0.dswci5u.mongodb.net/?retryWrites=true&w=majority";
// process.env.LiveMongo
let dotenv = require('dotenv');
dotenv.config()

const ObjectID = require('mongodb').ObjectId;
let db;



// db connection
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('amazondb');
    })

// add product
productRouter.post('/addProductDetails',(req,res)=>{
    // productDetails.create
   db.collection('productDetails').insertMany(req.body, (err,result)=>{
           if(err){
           res.send({
               message:'Server Side Error',
               status:500
           })
       }
       else{
           res.send({
               message:'Product detail is added',
               status:200
           })
       }
   })
})

// view product
productRouter.get('/viewProductDetails',(request, response)=> {
   db.collection('productDetails').find().toArray((error, result)=> {
           if (error) {
               response.send({
                   message: 'not found!',
                   status: 404
               });
           } else {

               response.send({ status: 200, message: "food details retrieved successfully", data: result })
           }
       })
    
})


// PUT method - update product

productRouter.put('/updateProductDetails',(request, response)=> {
           db.collection('productDetails').updateOne({ _id: ObjectID(request.body._id) }, {
       //    set for updating the records
               $set: {
                   Price : request.body.Price,
                   Size : request.body.Size
               }
       },(error, result)=> {
           if (error) {
               response.send({
                   message: 'not found!',
                   status: 404
               });
           } else {

               response.send({ status: 200, message: "Product details updated successfully" })
           }
       })
   })


// DELETE  method - product delete
productRouter.delete('/deleteProductDetails', (request, response)=> {
   
       db.collection('productDetails').deleteOne({ _id: ObjectID(request.body._id) }, (err, result)=>  {
           if (err) {
               res.send({
                   message: 'Server side  error!',
                   status: 500
               });
           } else {

               response.send({ status: 200, message: "Product details deleted successfully" })
           }
       })
 })


module.exports = productRouter;