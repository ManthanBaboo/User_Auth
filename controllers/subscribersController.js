"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
    index: (req, res, next) => {
        Subscriber.find()
            .then(subscribers => {
                res.locals.subscribers = subscribers;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscriber data: ${error.message} `);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: (req, res, next) => {
        let newSubscriber = new Subscriber({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            zipCode: req.body.zipCode,
            password: req.body.password
        });
        Subscriber.create(newSubscriber)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                res.locals.redirect = "/subscribers";
                next();
            })
            .catch(error => {
                console.log(`Error saving subscriber: ${error.message}`);
                next(error);
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscriber by ID: ${error.message}`);
                next(error);
            })
    },
    showView: (req, res) => {
        res.render("subscribers/show")
    },
    edit: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.render("subscribers/edit", { subscriber: subscriber });
            })
            .catch(error => {
                console.log(`Error loading subscriber by ID: ${error.message}`);
                next(error);
            })
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id;
        // let updatedSubscriber = new Subscriber ({
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     zipCode: req.body.zipCode,
        //     password: req.body.password
        // });
        var updatedSubscriber = {};
        updatedSubscriber.firstName = req.body.firstName;
        updatedSubscriber.lastName =  req.body.lastName;
        updatedSubscriber.email = req.body.email;
        updatedSubscriber.zipCode = req.body.zipCode;
        updatedSubscriber.password = req.body.password;
        
        Subscriber.findByIdAndUpdate(subscriberId, updatedSubscriber)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                res.locals.redirect = `/subscribers/${subscriber._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error loading subscriber by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
            .then(() => {
                res.locals.redirect = "/subscribers";
                next();
            })
            .catch(error => {
                console.log(`Error loading subscriber by ID: ${error.message}`);
                next(error);
            })
    }
}