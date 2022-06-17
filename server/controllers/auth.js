const User = require('../models/User');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var register = async (req, res, next) => {
    try {
        const { username, email, password, gender } = req.body;
        if (!username || !email || !password || !gender)
            return res.json({ message: 'Something went wrong, please try again' });

        const usernameId = await User.findOne({ username: username });
        const emailId = await User.findOne({ email: email });
        if (usernameId || emailId) return res.json({ message: 'Username or email already exists' });

        const salt = await brcypt.genSalt(10);
        const hashPassword = await brcypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashPassword,
            gender,
        });
        await user.save();

        return res.status(200).json({ message: 'You have successfully registered ' });
    } catch (e) {
        next(e);
    }
};

var login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Something went wrong, please try again' });

        const user = await User.findOne({ email: email });
        if (!user) return res.status(401).json({ message: 'Email or password is incorrect' });

        const isMatch = await brcypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Email or password is incorrect' });

        const accessToken = jwt.sign(user._id.toString(), process.env.SECRET);
        await user.updateOne({ accessToken: accessToken });

        const { username, image, gender } = user;
        const newInfor = { username, image, email, gender, accessToken };
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            expires: new Date(Date.now() + 432000000),
        });

        return res.status(200).json({ newInfor });
    } catch (e) {
        next(e);
    }
};

var logout = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.accessToken) {
        return res.status(204);
    }
    const refreshToken = cookies.accessToken;
    // Is refreshToken in db?
    const foundUser = await User.findOne({ accessToken: refreshToken });
    if (!foundUser) {
        res.clearCookie('accessToken');
        return res.sendStatus(204);
    }

    res.clearCookie('accessToken');
    res.sendStatus(200);
};

var refreshToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!Boolean(cookies?.accessToken)) return res.json({ permis: false });

        const refreshToken = cookies.accessToken;
        const foundUser = await User.findOne({ accessToken: refreshToken });
        if (!foundUser) return res.json({ permis: false });

        const { username, image, gender, email } = foundUser;
        const Infor = { username, image, email, gender, accessToken: cookies.accessToken };

        return res.status(200).json({ Infor, permis: true });
    } catch (e) {
        next(e);
    }
};

var logInSocial = async (req, res, next) => {
    try {
        const { displayName, email, photoURL } = req.body;
        if (!email || !displayName)
            return res.status(400).json({ message: 'Something went wrong, please try again', success: false });

        const user = await User.findOne({ email: email });
        let accessToken;
        if (!user) {
            const newInf = new User({
                username: displayName,
                email: email,
                image: photoURL,
                password: '123456',
            });
            await newInf.save();
            accessToken = jwt.sign(newInf._id.toString(), process.env.SECRET);
            await newInf.updateOne({ accessToken: accessToken });
        } else {
            accessToken = jwt.sign(user._id.toString(), process.env.SECRET);
            await user.updateOne({ accessToken: accessToken });
        }

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            expires: new Date(Date.now() + 432000000),
        });

        return res.status(200).json({ accessToken, success: true });
    } catch (e) {
        next(e);
    }
};

var updateAccount = async (req, res, next) => {
    try {
        const userId = jwt.verify(req.params.userId, process.env.SECRET);
        const user = await User.findById(userId);
        if (!user) return res.json({ success: false });
        const { password } = req.body;
        if (password !== '') {
            const isMatch = await brcypt.compare(password, user.password);
            if (!isMatch) return res.json({ success: false });
            user.updateOne(req.body);
        } else {
            const { username, email, url, gender } = req.body;
            await user.updateOne({ username, email, image: url, gender });
        }

        return res.status(200).json({ user, success: true });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    register,
    login,
    logout,
    refreshToken,
    logInSocial,
    updateAccount,
};
