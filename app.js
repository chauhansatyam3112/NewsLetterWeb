

const mailchimp = require("@mailchimp/mailchimp_marketing");
const express=require("express");

const bodyParser=require("body-parser");
const request=require("request");



const app=express();
//static server to serevr up static file we need to use a fun express.static
//public is a folder which keeps all the static files
app.use(express.json());
//app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


mailchimp.setConfig({
    apiKey: "2944531da19bf8cc159b0bf20857681f-us21",
    server: "us21",
  });

//   const run = async () => {
//     const response = await mailchimp.lists.addListMember("89b0c21a18", {
//       email_address: "Ebony_Brekke@gmail.com",
//       status: "pending",
//     });
//     console.log(response);
//   };
  
 
  

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
// app.post("/",async(req,res,next)=>{
//     var fname=req.body.fname;
//     var sname=req.body.sname;
//     var email=req.body.email;
//    // console.log(fname, sname, email);


   
//         const response = await mailchimp.lists.addListMember("89b0c21a18 ", {
//           email_address:email,
//           status: "subscribed",
//           merge_fields: {
//             FNAME:fname,
//             LNAME:sname,
//          }
//         });

//     res.status(200).json(response);

      
      
      
// });
app.post("/", async (req, res) => {
    var fname=req.body.fname;
        var sname=req.body.sname;
        var email=req.body.email;
    const addListMember = async () => {
        try {
            const response = await mailchimp.lists.addListMember("89b0c21a18", {
                email_address: email,
                status: 'subscribed',
                // email_type: 'html',
                merge_fields: {
                    FNAME: fname,
                    LNAME: sname
                },
               
            })
            // if try works fine then the post request will store data in mailchimp server
            //this will go to client website 
        res.status(200).sendFile(__dirname+"/success.html");
        }
        
        catch (err) {
            res.status(400).sendFile(__dirname+"/failure.html");
        }
    }
  addListMember()
})
// app.get("/failure",function(req,res){
    // res.send();
// });
app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000 ,function(req,res){
console.log("Server is running at 3000");
});







// 769e449727bd26892bbb866742b0855e-us21
// 89b0c21a18 audience ID
// --data @- \
// <<EOF | jq 'del(._links)'
// {
// 	"operations":[
//     	{
//         	"method": "POST",
//         	"path": "/lists/${listid}/members",
//         	"operation_id": "${subscriber1[id]}",
//         	"body": "{\"email_address\":\"${subscriber1[email]}\",\"status\":\"${subscriber1[status]}\"}"
//     	},
//     	{
//         	"method": "POST",
//         	"path": "/lists/${listid}/members",
//         	"operation_id": "${subscriber2[id]}",
//         	"body": "{\"email_address\":\"${subscriber2[email]}\",\"status\":\"${subscriber2[status]}\"}"
//     	}
// 	]
// }