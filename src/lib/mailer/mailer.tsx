import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password",
    },
  });


export async function sendMail(sender:string,recipient:string, subject:string, text:string, html:any) {
  
    const info = await transporter.sendMail({
        from: sender, 
        to: recipient,
        subject: subject, 
        text: text,
        html: html
    });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

