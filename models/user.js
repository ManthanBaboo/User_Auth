
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
Subscriber = require("./subscriber")
Course = require("./course")

userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code must be 5 digits"],
            max: 99999
        },
        courses: [{type: mongoose.Schema.Types.ObjectId, ref: Course}], 
        subscribedAccount: {type: mongoose.Schema.Types.ObjectId, ref: Subscriber}
    },
    {
        timestamps: true
    }
)

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`
});

userSchema.pre("save", function (next) {
    let user = this;
    if(user.subscribedAccount == undefined) {
        Subscriber.findOne({
            email: user.email
        })
        .then(subscriber => {
            user.subscribedAccount = subscriber;
            next();
        })
        .catch(error => {
            console.log(`Error in associating subscriber: ${error.message}`);
            next(error);
        })
    }
    else {
        next();
    }
});


userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);