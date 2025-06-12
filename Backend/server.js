const express = require('express')
var cors = require('cors')
const port = 4000
const bodyparser=require('body-parser')
const {MongoClient}=require('mongodb');
const app=express();
app.use(cors({
  origin: "https://iflowly.netlify.app", // replace with your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
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
app.post('/getusers',async(req,res)=>{
  const usersCollection = db.collection('usersdata');
  const {userIds}=req.body;
  if(userIds.length!=0)
  {

    const users = await usersCollection.find({ email: { $in: userIds } }).toArray();
    res.json(users);
  }

})
app.post('/workspaces',async(req,res)=>{
    const workspace=req.body;
    // console.log(workspace);
    const insert=await collection.insertOne(workspace);
    res.send({succes:true});
})
app.delete('/workspace',async(req,res)=>{
   const {workspaceid}=req.body;
   const del=await collection.deleteOne({workspaceid:workspaceid});
   res.send({succes:true})
})
app.get('/workspacelist',async(req,res)=>{
    const {orgId,userId}=req.query;
  let filter={};
//   console.log(orgId,userId)
  if(orgId)
  {
    filter={"orgId.orgId":orgId};
  }
  else if(userId)
  {
    filter={"orgId.orgId":null,"orgId.userId":userId}
  }
    // console.log('this is' ,orgId)
    const data=await collection.find(filter).toArray();
    res.json(data);
})
app.post('/userdata',async(req,res)=>{
  const usersCollection = db.collection('usersdata');
  const { name, avatar, email } = req.body;
    const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
      
  } else {
      await usersCollection.insertOne({ name, avatar, email });
      return res.status(201).json({ success: true, message: "User added" });
  }  
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