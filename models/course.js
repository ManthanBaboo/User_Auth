const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudent: {
            type: Number,
            default: 0,
            min: [0, "Course cannot have a negative number of students!"]
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Course cost cannot be a negative number!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Course", courseSchema);