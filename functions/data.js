const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

var jsonParser = bodyParser.json();

router.post('/', jsonParser, (req,resp) => {

    console.log("Request object", req.body.txnId);

    //Fetches transaction Id
    let txnId = req.body.txnId;
    //Fetches base64 encoded userID
    let userId = req.body.userId;
    //Decodes base64 userId
    let buff = Buffer.alloc(1024, userId, 'base64');
    let text = buff.toString('ascii');

    //Store necessary details in firestore

    return resp.status(200).json({
        messsage: 'Greetings!! We have received ur notification'
    });
});

module.exports = router;