import mongoose from 'mongoose'
import { string } from 'zod'


// mongo db provides a default id but we want some thing a custom id so we are defining it 
// in the schema we create a custom id for the user and inside the obboarded the id is created by default by the mnongo db.
//the id is necessary for the user schema to identufy a specific user.
// to pick up a specifuc user alwasys pick by the user.id 
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