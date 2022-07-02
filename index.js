const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://todoTaskUser1:tOy72LG5m4d9MOQu@cluster0.vpsz1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const tasksCollection = client.db("todoTaskDB").collection("tasks");

    // Task API

    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const totalData = await tasksCollection.find(query).toArray();
      res.send(totalData);
    });

    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send({ success: true, result });
    });
  } finally {
  }
}
run();

app.get("/", (req, res) => {
  res.send("Todo Server Working... Alhamdulillah!!");
});

app.listen(port, () => {
  console.log(`Todo Server Listening on port ${port}`);
});
