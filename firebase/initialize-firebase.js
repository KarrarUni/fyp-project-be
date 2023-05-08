require("dotenv").config();
const firebase = require("firebase-admin");
const serviceAccount = require("../client-secret.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});

// Creating a bucket reference
const bucket = firebase.storage().bucket();
module.exports = bucket;

console.log("Firebase bucket initialized successfully");  