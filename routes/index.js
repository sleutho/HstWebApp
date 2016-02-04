var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    if (Object.keys(req.cookies).indexOf('username') != -1)
        return res.redirect('/studies');
    else
        res.render('index', { title: 'Choose a username' });
});

router.post('/login/:username', function (req, res, next) {
    res.cookie('username', req.params.username);
    res.redirect('/studies');
});

router.get('/logout', function (req, res, next) {
    res.clearCookie('username');
    res.redirect('/');
});

module.exports = router;
