import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;


export async function getTransporter() {
    if(!transporter){
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jeanette.cronin47@ethereal.email',
                pass: 'f2Tz1s3smjEHVta5Pt'
            }
        });
      return transporter;
    }
    return transporter;
  
  }