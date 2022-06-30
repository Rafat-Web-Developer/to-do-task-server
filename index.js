const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo Server Working... Alhamdulillah!!");
});

app.listen(port, () => {
  console.log(`Todo Server Listening on port ${port}`);
});
