const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const brcypt = require('bcrypt');

var sendMail =async (req, res, next) => {
    const { sender_mail } = req.body;
    
    User.findOne({ email: sender_mail })
        .then((data) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.PASS_MAIL,
                },
            });
            transporter.sendMail(
                {
                    from: `<${process.env.USER_MAIL}>`,
                    to: sender_mail,
                    subject: 'FORGOT PASSWORD',
                    text: 'NGOC VAN',
                    html: `
                <p>Click here to get password</p>
                <br/>
                <p>${process.env.PATH_LOCAL}/api-nodemail-forgot-password/getmail/${data.accessToken}</p>
                <br/>
            `,
                },
                (err) => {
                    next(err);
                },
            );
        })
        .catch((err) => {
            next(err);
        });

    return res.status(201).json({ success: true });
};

var getMail = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const verifyUserId = jwt.verify(userId, process.env.SECRET);

        const user = await User.findOne({ _id: verifyUserId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        let salt = await brcypt.genSalt(10);
        const newPassword = await brcypt.hash('123456', salt);

        user.updateOne({ password: newPassword })
            .then(() => {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.USER_MAIL,
                        pass: process.env.PASS_MAIL,
                    },
                });
                transporter.sendMail(
                    {
                        from: `<${process.env.USER_MAIL}>`,
                        to: user.email,
                        subject: 'FORGOT PASSWORD',
                        text: 'NGOC VAN',
                        html: `
                    <p>Hello my friend</p>
                    <br/>
                    <p>Your new password:123456</p>
                    <br/>
                    <p>Please be careful with your password ^_^</p>
                    <p>${process.env.PATH_CLIENT}/login</p>
                `,
                    },
                    (err) => {
                        next(err);
                    },
                );
            })
            .catch((err) => {
                next(err);
            });
        return res.status(201).json({ message: 'check again your email' });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    sendMail,
    getMail,
};
