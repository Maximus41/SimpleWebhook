const functions = require('firebase-functions');
const consent = require('./consent.js');
const data = require('./data.js');
const express = require('express');
const admin = require('./common.js');
var app = express();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

app.use('/consent', consent);
app.use('/Consent', consent);
app.use('/data', data);

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.notifyDataChange = functions.firestore.document('/ConsentStatus/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const txn = snap.data().txn;
      const status = snap.data().status;
      const userid = snap.data().user_id;
      const platform = snap.data().platform;
    
        //Send Notificaton

        return admin.firestore.doc('/User/dEeXaatvloOug0xRGDKj').get().then(userDoc => {
            const registrationTokens = ["cZYTstGF60o:APA91bFBf3meCQD0gzK_gtRa_P0J7oz6Q2kBUz7O-cGdile4m3ZlJrArzTJLf_3LNCVUKMLscnR8lOnBYgBuJlLBEWoSjUalCPnQ5FFAd8TtPYpJiMsf6JuOp08NruHS-_uEldrIjJT-",
        "fRyYDMCTR58:APA91bFCqG2T_vDlG7HvWPE--aBVJbyuD08Ph5I2p-dfoiMNH8sWO7rO27iEBeM3B-_K8hT2cMG85h4WlsIt-KPXb--zckRAPQljPvK41NOgUxxFjF9yVPE2TguTibOebtTDxiljDH3h"]; 
            console.log('Registration Token', registrationTokens);
            // const notificationBody = (message['type'] === "TEXT") ? message['text'] : "You received a new image message."
            const payload = {
                notification: {
                    title: platform + ' : Consent Request Status ',
                    body: 'Your consent request with transaction id ' + txn + ' is ' + status,
                    clickAction: 'EnterVuaActivity'
                }
            }
            
            return admin.messaging.sendToDevice(registrationTokens, payload).then( response => {
                const stillRegisteredTokens = registrationTokens
                console.log("Response", response);
                response.results.forEach((result, index) => {
                    const error = result.error
                    if (error) {
                        const failedRegistrationToken = registrationTokens[index]
                        console.error('blah', failedRegistrationToken, error)
                        if (error.code === 'messaging/invalid-registration-token'
                            || error.code === 'messaging/registration-token-not-registered') {
                                const failedIndex = stillRegisteredTokens.indexOf(failedRegistrationToken)
                                if (failedIndex > -1) {
                                    stillRegisteredTokens.splice(failedIndex, 1)
                                }
                            }
                    }
                })
 
                // return admin.firestore.collection("User").update({
                //     registrationTokens: stillRegisteredTokens
                // })
            })
        })
    });


exports.callback = functions.https.onRequest(app);