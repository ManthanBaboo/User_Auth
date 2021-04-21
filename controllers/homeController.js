// var courses = [
//     {
//         title: "Strange Buns",
//         cost: "$45"
//     },
//     {
//         title: "Plum Pudding",
//         cost: "$30"
//     },
//     {
//         title: "Dish o' the Sea",
//         cost: "$50"
//     },
//     {
//         title: "Miner's Treat",
//         cost: "$75"
//     }
// ]

module.exports = {
    index: (req, res) => {
        res.render("index");
    }
}

// old parts
// exports.showCourses = (req, res) => {
//     res.render("courses", {offeredCourses: courses});
// }

// exports.showSignUp = (req, res) => {
//     res.render("contact")
//  }

// exports.postedSignUpForm = (req, res) => {
//      res.render("thanks")
//  }

// exports.showIndex = (req, res) => {
//     res.render("index")
// }