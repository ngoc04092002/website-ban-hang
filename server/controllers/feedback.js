const fs = require('fs');

var feedback = (req, res, next) => {
    try {
        let data = fs.readFileSync('feedback.json', { encoding: 'utf8', flag: 'r' });
        if (!!data) {
            let feedback = JSON.parse(data);
            feedback.push(req.body);
            fs.writeFileSync('./feedback.json', JSON.stringify(feedback));
        } else {
            let feedback = [];
            feedback.push(req.body);
            fs.writeFileSync('./feedback.json', JSON.stringify(feedback));
        }
    } catch (e) {
        next(e);
    }

    return res.status(200).json({ success: true });
};

module.exports = {
    feedback,
};
