const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
const port = 55000;

app.use(cors());

// Middleware to parse JSON body data
app.use(bodyParser.json());

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anuvihas2005@gmail.com',  
    pass: 'rxzg pytk eltu tdnj',  // App password 
  },
});

// POST route to handle form submissions
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Setup email data
  const mailOptions = {
    from: email,  
    to: 'anuvihas2005@gmail.com',
    subject: `New message from ${name}`,
    text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send email via nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send email.' });
    }
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Message sent successfully.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
