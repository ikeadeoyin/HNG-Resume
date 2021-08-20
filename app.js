const nodemailer = require("nodemailer")
const express = require('express');
require('dotenv').config()

const port = process.env.PORT || 3000;

const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
 

// view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
  res.render('index'));

app.post("/contact", async (req, res)=>{
    // console.log(req.body)
    let name = req.body.name
    let email = req.body.email
    let message = req.body.message
    // console.log(name, email)

     const text = ` Hi ${name}, your request has been submitted, I willl reach out to you shortly. However, this is 
     what you submittd:
     Name: ${name} ,
     Email: ${email},
     Message: ${message}.`
    // console.log(text)

    const html = `<p> Hi ${name}, your request has been submitted, I willl reach out to you shortly. However, this is 
    what you submittd</p> 
    <li>${name}</li>
     <li>${email}</li>
    <li>${message}</li>`

    // console.log(html)

//      // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    service:"gmail",
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
      user: process.env.NODE_MAILER_USER, // generated ethereal user
       pass: process.env.NODE_MAILER_PASS, // generated ethereal password
     },
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
     from: `Oyin Olatunji: ${process.env.NODE_MAILER_USER}`, // sender address
     to: `${email}, ${process.env.NODE_MAILER_USER}`, // list of receivers
     subject: "Hello ✔", // Subject line
     text: text, // plain text body
     html: html // html body
   });

   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//    main().catch(console.error);

//   res.render("index", {submited: "Your request was submitted"})
 
  

    res.send("<p>Thanks, Your request has been sent</p>")
})

app.listen(port, () =>{
    console.log(`listening for request in port ${port}`)
    

   
})


