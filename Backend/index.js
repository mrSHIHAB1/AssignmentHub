
const express = require('express')
const cors=require('cors')
const app = express()
const port=process.env.PORT || 50002
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())
require('dotenv').config()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://as11-15fee.web.app",
      "https://as11-15fee.firebaseapp.com",
      "https://as11server.vercel.app"
    ],
    credentials: true,
  })
);
const uri = "mongodb+srv://assignment:J0NAECV2GrYkJg9w@cluster0.zignzkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    
    // await client.connect();
    const createassignment=client.db('Assignment').collection('creass')
    const Submitedass=client.db('Assignment').collection('subass')
    
    app.post('/creass', async (req, res) => {
        const addasmnt = req.body;
      
        const result = await createassignment.insertOne(addasmnt);
        res.send(result);
  
      })
      app.post('/subass', async (req, res) => {
        const submit = req.body;
      
        const result = await Submitedass.insertOne(submit);
        res.send(result);
  
      })
      app.put('/subass/:id', async (req, res) => {
        const assignmentId = req.params.id;
        const { TpdfLink, Tnote, Tstatus } = req.body;
    
        try {
        
            const result = await Submitedass.updateOne(
                { _id: new ObjectId(assignmentId) },
                {
                    $set: {
                        status: Tstatus,
                        TpdfLink, 
                        Tnote    
                    }
                }
            );
    
           
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Assignment updated successfully' });
            } else {
                res.status(404).json({ message: 'Assignment not found' });
            }
        } catch (error) {
            console.error('Error updating assignment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
 
   

      app.get('/subass',async(req,res)=>{
        const cursor=Submitedass.find();
        const result=await cursor.toArray();
        res.send(result);
  
      })
      
      app.get('/creass',async(req,res)=>{
        const cursor=createassignment.find();
        const result=await cursor.toArray();
        res.send(result);
  
      })
      app.get('/creass/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await  createassignment.findOne(query);
        res.send(result)
      })
      app.get('/subass/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await  Submitedass.findOne(query);
        res.send(result)
      })
      app.put('/creass/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const option = { upsert: true };
        const updatespot = req.body;
        const upspot = {
          $set: {
            Title: updatespot.Title,
            photo: updatespot.photo,
            Description: updatespot.Description,
            Marks: updatespot.Marks,
            Dificultiy:updatespot.Dificultiy,
            Due_Date: updatespot. Due_Date,
            
          }
        }
        const result = await  createassignment.updateOne(filter, upspot, option)
        res.send(result)
      })
      app.delete('/creass/:id', async (req, res) => {
        const id = req.params.id; 
        const query = { _id: new ObjectId(id) };
        const result = await createassignment.deleteOne(query);
        res.send(result);
      });
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})