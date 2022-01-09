const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number ,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    feedback: [
        {
            firstname:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            }, 
            message:{
                type: String,
                required: true
            }
        }
    ],
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});

usersSchema.methods.generateToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()} , 
        "mynameisdeepakfromcomputerbranch");

        this.tokens = this.tokens.concat({token: token});

        await this.save();
        return token;

    }catch(e){
        console.log(e)
    }
}

usersSchema.methods.addMessage = async function(firstname, email,  message){
    try{
        this.feedback = this.feedback.concat({ firstname, email,  message });
        await this.save();
        return this.feedback;
    }catch(e){
        console.log("Error AddMessage");
    }
}


usersSchema.pre("save", async function(next) {
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,10);
        this.confirmpassword = await bcrypt.hash(this.password,10);
    }
    next();
});



// create collection
const Register = new mongoose.model("RegisteredUser", usersSchema);

module.exports = Register;
