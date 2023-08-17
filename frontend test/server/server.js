const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require("cors");

const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");
var serviceAccount = require("../chollo-es-service-account.json");
var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

app.post("/verify", (req, res) => {
    var idToken = req.body.idToken;
    
    defaultApp.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            // ...
            console.log(uid) ;
            return res.json("idtoken verified")
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send({
                message: "error occured"
            })
            // Handle error
        });
})

// Use the Routes
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Server is running on PORT ${PORT}!`));
});