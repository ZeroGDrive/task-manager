const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');
const sendgridKey = keys.sendgridKey;

sgMail.setApiKey(sendgridKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ayoubyf@gmail.com',
    subject: 'Welcome to the App',
    text: `Welcome to the app ${name}, let me know how you get along with the app`,
  });
};

const canclationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ayoubyf@gmail.com',
    subject: 'You cancled your supscribtion!',
    text: 'Can you please tell us the reason why you left ?',
  });
};

module.exports = {
  sendWelcomeEmail,
  canclationEmail,
};
