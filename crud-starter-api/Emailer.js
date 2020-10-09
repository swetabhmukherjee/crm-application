const nodemailer = require('nodemailer');

async function Emailer(cust_email) {
    console.log('entering Emailer function()');
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'thebongbrat@gmail.com',
        pass: 'swetabh@1998'
    
      }
    });
    
    let mailOptions = {
    
      from: 'thebongbrat@gmail.com',
      to: cust_email,
      subject: 'test email',
      text: cust_email
    };
    
    transporter.sendMail(mailOptions, function(err, data){
    
      if(err){
        console.log('error',err);
      }
      else{
        console.log('email sent');
        window.alert('email sent');
      }
    })
}

export default Emailer;
