const express = require('express')
var cors = require('cors')
const port = 4000
const bodyparser=require('body-parser')
const {MongoClient}=require('mongodb');
const app=express();
app.use(cors())
require('dotenv').config()
app.use(bodyparser.json())
console.log(process.env.MONGO)
const url=process.env.MONGO;
const client=new MongoClient(url);
const dbname="flowly";
const db=client.db(dbname);// creates a database of dbname
const collection=db.collection('workspaces');//create a workspace
//workspaces in the database;
app.get('/',async(req,res)=>{
    res.send('hello')
})
app.post('/workspaces',async(req,res)=>{
    const workspace=req.body;
    const insert=await collection.insertOne(workspace);
    res.send({succes:true});

})
app.get('/workspaces',async(req,res)=>{
    const  {workspaceid}=req.query;
    const data=await collection.findOne({workspaceid:workspaceid});
    res.json(data);
})
app.put('/workspaces',async(req,res)=>{
   const {workspaceid,workspace}=req.body;
//    console.log(workspace);
   const{_id,...updatedworkspace}=workspace;
   const result=await collection.updateOne({workspaceid},{$set:updatedworkspace})
   res.status(200).json({ success: true, message: "Workspace updated successfully" });
})
app.delete('/workspaces',async(req,res)=>{
    const {workspaceid,docid}=req.body;
    const result = await collection.updateOne(
        { workspaceid },
        { $pull: { docs: { id: docid } } } // Removes the document where id matches docid
    );
    res.status(200).json({ success: true, message: "Document deleted successfully" });



})
app.listen(port)