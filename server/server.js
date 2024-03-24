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
  (await AI).storeCV(req.file.path);
  res.send({success:true});
});

app.post('/match', async (req, res) => {
  const job = req.body.job || null;
  if(job)
    (await AI).jobMatch(job);
  res.send({success:true});
});

app.post('/chat', async (req, res) => {
  const message = req.body.message || null;
  if(message)
    (await AI).getTextResponse(message);
  res.send({success:true});
});
//#endregion

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});