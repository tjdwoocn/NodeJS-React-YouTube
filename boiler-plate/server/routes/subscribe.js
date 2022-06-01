const express = require('express');
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");
const path = require('path');
const { default: Subscribe } = require('../../client/src/components/views/VideoDetailPage/Sections/Subscribe');
const router = express.Router();

// ==============================
//            Subscribe 
// ==============================

router.post('/subscribeNumber', (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length})
        })

});


router.post('subscribed', (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec( (err, subscribe) => {

        })



});

module.exports = router;
