Course = require("./course")

const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowecase: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code must be 5 digits"],
            max: 99999
        },
        password: {
            type: String,
            required: true
        },
        courses: [{type: mongoose.Schema.Types.ObjectId, ref: Course}]
    },
    {
        timestamps: true
    }
    );

subscriberSchema.methods.getInfo = function () {
    return `First Name: ${this.firstName} Last Name: ${this.lastName}  Email: ${this.email} Zipcode: ${this.zipCode}`;
}

module.exports = mongoose.model("Subscriber", subscriberSchema);