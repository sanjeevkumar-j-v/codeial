const nodemailer = require('../config/nodemailer');



exports.newComment = (comment) => {
    console.log('inside new comment mailer', comment);

    nodemailer.transporter.sendMail({
        from: 'sanjeevkumarjv@gmail.com',
        to: comment.user.email,
        subject: "New comment published!",
        html: '<h1>Yup, your comment is published'
    }, (err, info) => {
        if(err) { console.log('Error in sending mail', err); return;}

        console.log('Message sent', info);
        return; 
    });
}