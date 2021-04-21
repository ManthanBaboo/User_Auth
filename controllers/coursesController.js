"use strict";

const Course = require("../models/course");

module.exports = {
    index: (req, res, next) => {
        Course.find()
            .then(courses => {
                res.locals.courses = courses;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscrber data: ${error.message} `);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("courses/index");
    },
    new: (req, res) => {
        res.render("courses/new");
    },
    create: (req, res, next) => {
        let newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudent: req.body.maxStudent,
            cost: req.body.cost
        });
        Course.create(newCourse)
            .then(course => {
                res.locals.course = course;
                res.locals.redirect = "/courses";
                next();
            })
            .catch(error => {
                console.log(`Error saving course: ${error.message}`);
                next(error);
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error fetching course by ID: ${error.message}`);
                next(error);
            })
    },
    showView: (req, res) => {
        res.render("courses/show")
    },
    edit: (req, res, next) => {
        let courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.render("courses/edit", { course: course });
            })
            .catch(error => {
                console.log(`Error loading course by ID: ${error.message}`);
                next(error);
            })
    },
    update: (req, res, next) => {
        let courseId = req.params.id;
        // let updatedCourse = new Course ({
        //     title: req.body.title,
        //     description: req.body.description,
        //     maxStudent: req.body.maxStudent,
        //     cost: req.body.cost
        // });
        var updatedCourse = {};
        updatedCourse.title = req.body.title;
        updatedCourse.description =  req.body.description;
        updatedCourse.maxStudent = req.body.maxStudent;
        updatedCourse.cost = req.body.cost;

        Course.findByIdAndUpdate(courseId, updatedCourse)
        .then(course => {
            res.locals.course = course;
            res.locals.redirect = `/courses/${course._id}`;
            next();
        })
        .catch(error => {
            console.log(`Error loading course by ID: ${error.message}`);
            next(error);
        })
    }, 
    delete: (req, res, next) => {
        let courseId = req.params.id;
        Course.findByIdAndRemove(courseId)
        .then(() => {
            res.locals.redirect = "/courses";
            next();
        })
        .catch(error => {
            console.log(`Error loading course by ID: ${error.message}`);
            next(error);
        })
    }
}