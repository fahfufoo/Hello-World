var fs = require("fs");
var contents = fs.readFileSync("user.json");
var jsonContent = JSON.parse(contents);
var express =   require("express");
var bodyParser =    require("body-parser");
var multer  =   require('multer');
var app =   express();
var cal = require('./calGrade.js');

app.use(bodyParser.json());

var uploadfilename;

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    uploadfilename=file.fieldname + '-' + Date.now();
     callback(null,uploadfilename);
  }
});
var upload = multer({ storage : storage }).single('userFile');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
      
});

app.get('/script.js',function(req,res){
      res.sendFile(__dirname + "/script.js");
});

app.get('/style.css',function(req,res){
      res.sendFile(__dirname + "/style.css");
});

q=0;
w=0;
var id;

app.post('/upload',function(req,res){
  // console.log(req.body.file);
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        w=0;
        if(typeof req !== 'undefined') XLSX = require('xlsx');

        var workbook = XLSX.readFile('./uploads/'+uploadfilename);
        var sheet_name_list = workbook.SheetNames;
       
        sheet_name_list.forEach(function(y){ 
          var worksheet = workbook.Sheets[y];
          jsonContent[w]={"SheetNo":y,student:{}};
          q=0;
          
          for (z in worksheet ) {
            if(z=='!ref')continue;    
            if(z[0]=='A'){id=worksheet[z].v;}
            else
            {
              score=worksheet[z].v ;
              grade = cal.calGrade(score)
              jsonContent[w].student[q]={"id":id,"score":score,"grade":grade};

              q++;
            }
        }//end for  
      w++;
      });//for each
        res.json(jsonContent);
        res.end();
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
