//#region require/import
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require("multer");
//#endregion

//#region const
const app = express();
const port = 3001;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
const AI = importAI();
//#endregion

//#region app.use()
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//#endregion

//#region functions 
async function importAI(){
  let { AIService } = await import('./AIservice.mjs');
  return new AIService();
}
//#endregion

//#region post
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log("invoked /upload")
  const status = await (await AI).storeCV(req.file.path);
  res.send({status:status});
});

app.post('/match', async (req, res) => {
  console.log("invoked /match")
  const job = req.body.job || null;
  if(job){
    const candidates = await (await AI).jobMatch(job);
    res.send({success:true, candidates:candidates});
  }
  else{
    res.send({success:false});
  }
});

//test
app.post('/chat', async (req, res) => {
  console.log("invoked /chat")
  const message = req.body.message || null;
  if(message)
    (await AI).getTextResponse(message);
  res.send({success:true});
});
//#endregion

// test endpoint
app.get('/test', async (req, res) => {
  res.send({ message: "Hello World!"});
})

app.get('/CV', async (req, res) => {
  console.log("invoked /CV")
  const CV = await (await AI).DB.getCV({});
  res.send(CV);
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});