var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var userData = {
    'user@example.com': {
        '1': {'id': 1, title: 'title1', content: 'content1'},
        '2': {'id': 2, title: 'title2', content: 'content2'},
        '3': {'id': 3, title: 'title3', content: 'content3'},
        '4': {'id': 4, title: 'title4', content: 'content4'},
        '5': {'id': 5, title: 'title5', content: 'content5'},
        '6': {'id': 6, title: 'title6', content: 'content6'},
        '7': {'id': 7, title: 'title7', content: 'content7'},
        '8': {'id': 8, title: 'title8', content: 'content8'},
        '9': {'id': 9, title: 'title9', content: 'content9'},
        '10': {'id': 10, title: 'title10', content: 'content10'}
    }
}

router.get('/getallnotes', function (req, res, next) {
    res.status(200)
    let maps = userData[req.query.email];
    let result = [];
    for (var key in maps) {
        if (maps.hasOwnProperty(key)) {
            result.push(maps[key]);
        }
    }
    res.json(result);
});

var addNotesFun = function (req, res, next) {
    let note = req.body['note'];
    let maps = userData[req.query.email];
    if (!note.id) {
        let id = parseInt((Math.random() * 1000) % 1000);
        note.id = id;
    }
    maps[note.id + ''] = note;
    res.status(200)
    res.json("success")
};
var validateUserFun = function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    if(username=="user@example.com" && password=="1234"){
        res.status(200)
        res.json("success")
    }else{
        res.status(401)
        res.json("username or password is incorrect")
    }

};
router.post('/notes/add', addNotesFun);
router.post('/notes/save', addNotesFun);
router.post('/users/authenticate', validateUserFun);

module.exports = router;
