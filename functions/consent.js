const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./common.js');
const functions = require('firebase-functions');
var router = express.Router();

var jsonParser = bodyParser.json();

router.post('/', jsonParser, (req,resp) => {

    functions.logger.log("/", req.body);

    //Fetches transaction Id
    let txnId = req.body.txnId;
    //Fetches base64 encoded userID
    let userId = req.body.userId;
    //Decodes base64 userId
    let buff = Buffer.alloc(1024, userId, 'base64');
    let text = buff.toString('ascii');
    //Fetches consent status
    let status = req.body.consentStatus;

    //Create a consentStatus object from json values

    let consent = {
        platform : 'Perfios', 
        user_id : userId,
        txn : txnId,
        status : status
    }

    //Store necessary details in firestore
    admin.firestore.collection('ConsentStatus').add(consent).then(data => {
        console.log("Status saved into database", data.id);
        resp.status(201).json({
            message : 'Received consent notification : ' + data.id
        })
    }).catch(error => resp.status(400).send(error));

});


router.post('/Notification', jsonParser, (req,resp) => {

    functions.logger.log("/Notification request", req.body);

    //Fetches transaction Id
    let txnId = req.body.txnid;
    //Fetches base64 encoded userID
    let userId = req.body.Notifier.id;
    //Decodes base64 userId
    // let buff = Buffer.alloc(1024, userId, 'base64');
    // let text = buff.toString('ascii');
    //Fetches consent status
    let status = req.body.ConsentStatusNotification.consentStatus;
    let ts = req.body.timestamp;
    let version = req.body.ver;

    //Create a consentStatus object from json values

    let consent = {
        platform : 'Yodlee',
        user_id : userId,
        txn : txnId,
        status : status
    }

    //Store necessary details in firestore
    admin.firestore.collection('ConsentStatus').add(consent).then(data => {
        console.log("Status saved into database", data.id);
        resp.status(201).json({
            ver: ""+ version,
            timestamp: "" + ts,
            txnid: "" + txnId,
            response: "OK"
          })
    }).catch(error => resp.status(400).send(error));

});

router.post('/notify', jsonParser, (req,resp) => {

    // console.log("Request object", req.body.txnId);

    // // Fetches transaction Id
    // let txnId = req.body.txnid;
    // //Fetches base64 encoded userID
    // let userId = req.body.Notifier.id;
    // //Decodes base64 userId
    // // let buff = Buffer.alloc(1024, userId, 'base64');
    // // let text = buff.toString('ascii');
    // //Fetches consent status
    // let status = req.body.ConsentStatusNotification.consentStatus;
    // let ts = req.body.timestamp;
    // let version = req.body.ver;

    //Create a consentStatus object from json values
    functions.logger.log("/notify request", req.body);

    let consent = {
        platform : 'Finvu Web',
        user_id : "userId",
        txn : "txnId",
        status : "status"
    }

    //Store necessary details in firestore
    admin.firestore.collection('ConsentStatus').add(consent).then(data => {
        console.log("Status saved into database", data.id);
        resp.status(200).json({
            // ver: ""+ version,
            // timestamp: "" + ts,
            // txnid: "" + txnId,
            response: "OK"
          })
    }).catch(error => resp.status(400).send(error));

});

module.exports = router;