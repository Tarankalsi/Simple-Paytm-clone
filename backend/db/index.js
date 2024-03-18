const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Taran@cluster0.9njkg5s.mongodb.net/paytm_clone')


//Define Schema for User
const UserSchema = new  mongoose.Schema({

    username : {
        type :String,
        required : true,
        unique : true,
        trim:true,
        minlength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLengh : 50
    },
    lastName : {
        type : String,
        required : true,
        trim: true,
        maxLengh : 50
    }
})

//Define Schema for Bank
const AccountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

//model from schema
const User = mongoose.model('User' , UserSchema)
const Account = mongoose.model("Account",AccountSchema)

module.exports ={
    User,
    Account,
}