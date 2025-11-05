
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://megewills11_db_user:DdufvFFwn0DdCZz7@csc-336.ragizo8.mongodb.net/?appName=CSC-336";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = await client.db("csc-336")
    const commentsCollection = db.collection("comments")
    await commentsCollection.insertOne({
        name: "Megan"
    })

    let megan = await commentsCollection.findOne({name: "Megan"})
    console.log(megan)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
