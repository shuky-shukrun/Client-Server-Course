var nodemailer = require("nodemailer");

function sendNewPasswordByEmail(email, newPassword) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let date = new Date(Date.now());
  var mailOptions = {
    from: "CSCars@gmail.com",
    to: email,
    subject: "CS Cars Password Recovery",
    text: `Your new password is: ${newPassword}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      console.log("\n\n");
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendWelcomeEmail(email, firstName, lastName) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "CSCars@gmail.com",
    to: email,
    subject: "Welcome to CS Cars!",
    text: `Hi ${firstName} ${lastName}!
Welcome to CS Cars Service.
We hope you'll enjoy the service.

Please fill free to contact us with any question.

Best Regards,
CS Team

https://cs-cars.herokuapp.com/
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      console.log("\n\n");
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendNewPasswordByEmail, sendWelcomeEmail };
