const admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myserver01082020.firebaseio.com"
  });


module.exports.firestore = admin.firestore();
module.exports.messaging = admin.messaging();