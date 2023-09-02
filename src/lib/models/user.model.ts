import mongoose from 'mongoose'
import { string } from 'zod'


// mongo db provides a default id but we want some thing a custom id so we are defining it 
const userSchema = new mongoose.Schema({
    id:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    image:String,
    bio:String,
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],
    onboarded:{
        type:Boolean,
        default:false,

    },
    communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Community'
        }
    ]


});

const User = mongoose.models.User||mongoose.model('User',userSchema);

export default User;