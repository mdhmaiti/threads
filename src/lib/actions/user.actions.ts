"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

export async function updateUser(

    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,

)
{
   await connectToDB();

   try {
    
   await User.findOneAndUpdate(
    { id: userId},
    {
        username:username.toLowerCase(),
        name,
        bio,
        image,
        onboarded:true,

    },
    { upsert:true}

   )

   if (path ==='/profile'){
    revalidatePath(path);
   }
    
   } catch (error:any) {
    throw new Error(`Failed to create/update user : ${error.message}`)
    
   }

}