var fs = require("fs");
var contents = fs.readFileSync("user.json");
var jsonContent = JSON.parse(contents);
var express =   require("express");
var bodyParser =    require("body-parser");
var multer  =   require('multer');
var app =   express();

app.use(bodyParser.json());

var uploadfilename;

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage }).array('userFile',2);

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
    upload(req,res,function(err) {

        if(err) {
            return res.end("Error uploading file.");
        }
        w=0;
        if(typeof req !== 'undefined') XLSX = require('xlsx');
        var workbook = XLSX.readFile('score.xlsx');
        var sheet_name_list = workbook.SheetNames;
       
        sheet_name_list.forEach(function(y){ 
          var worksheet = workbook.Sheets[y];
           jsonContent[w]={"SheetNo":y,student:{}};
          q=0;
          for (z in worksheet ) {
            if(z=='!ref')continue;    
            if(z[0]=='A')
            {
             id=worksheet[z].v;
            }
            else
            {
              score=worksheet[z].v ;
              if(score>100||score<0)grade='';
              else if(score>=80)grade = 'A';
              else if(score>=70)grade='B';
              else if(score>=60)grade='C';
              else if(score>=50)grade='D';
              else grade='F';
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



