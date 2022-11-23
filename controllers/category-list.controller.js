 const express = require('express')
const categoryRouter = express.Router();
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
categoryRouter.post('/addCategoryDetails',(req,res)=>{
    // productDetails.create
   db.collection('categoryDetails').insertMany(req.body, (err,result)=>{
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
categoryRouter.get('/viewCategoryDetails',(request, response)=> {
   db.collection('categoryDetails').find().toArray((error, result)=> {
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

categoryRouter.put('/updateCategoryDetails',(request, response)=> {
           db.collection('categoryDetails').updateOne({ _id: ObjectID(request.body._id) }, {
       //    set for updating the records
               $set: {
                   category_id : request.body.Category_id,
                   category : request.body.Category
               }
       },(error, result)=> {
           if (error) {
               response.send({
                   message: 'not found!',
                   status: 404
               });
           } else {

               response.send({ status: 200, message: "Cateory details updated successfully" })
           }
       })
   })


// DELETE  method - product delete
categoryRouter.delete('/deleteCategoryDetails', (request, response)=> {
   
       db.collection('categoryDetails').deleteOne({ _id: ObjectID(request.body._id) }, (err, result)=>  {
           if (err) {
               res.send({
                   message: 'Server side  error!',
                   status: 500
               });
           } else {

               response.send({ status: 200, message: "Category details deleted successfully" })
           }
       })
 })


module.exports = categoryRouter;