import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"

const app = express()
app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "devwebdainghia@gmail.com",
      pass: "wdjfoujrvmxfjhwu",
    },
});

const sendMail = async (from, content ,title = "New Email from Profile") => {
  try {
    await transporter.sendMail(
      {
        from: from,
        to: `devwebdainghia@gmail.com`,
        subject: title,
        html: content,
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

app.post("/api/send-mail",async(req,res) =>{
    console.log("vao day",req.body);
    const {from, content ,title} = req.body
    const status = await sendMail(from, content ,title)

    if(status) res.json({compete : true})
    else res.json({compete : false})
})


app.listen(5000,() => {
    console.log("server mail running : *",5000);
})