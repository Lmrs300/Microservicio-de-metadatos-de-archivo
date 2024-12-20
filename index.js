var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer=require("multer")

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + '/uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

app.post("/api/fileanalyse",upload.single('upfile'),(req,res)=>{
  const file=req.file

  const {filename,mimetype,size}=req.file

  console.log(file)
  res.json({name:filename,type:mimetype,size:size})
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
