require('dotenv').config();
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const { templateCreateAccount } = require('./template.js');

async function sendEmail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: data.to, // Change to your recipient
    from: 'leoneloliveros.co@gmail.com', // Change to your verified sender
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data,
  };

  // sgMail
  //   .send(msg)
  //   .then((response) => {
  //     console.log(response[0].statusCode);
  //     console.log(response[0].headers);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  try {
    const response = await sgMail.send(msg);
    console.log('envio correo');
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  } catch (err) {
    console.error(err);
  }
}

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailNodeMailer(user) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Leonel Oliveros 👻" <leonel.oliveros@makeitreal.camp>', // sender address
    to: 'francomelgar4@gmail.com, apuello1025@gmail.com, leoneloliveros.co@gmail.com', // list of receivers
    subject: templateCreateAccount(user).subject, // Subject line
    text: 'Hello world? How are you bye bye', // plain text body
    html: templateCreateAccount(user).html, // html body
    attachments: [
      {
        // file on disk as an attachment
        filename: 'cine.pdf',
        path: './cine.pdf', // stream this file
      },
    ],
  });
  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main({ email: 'leoneloliveros.co@gmail.com', firstName: 'Leonel' }).catch(
//   console.error,
// );

// sendEmail({
//   to: 'leoneloliveros.co@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   template_id: 'd-7f1ed07a54f24fc1aa0cec826b1aa79b',
//   dynamic_template_data: {
//     firstName: 'Leonel',
//   },
// });

module.exports = { sendEmail, sendEmailNodeMailer };
