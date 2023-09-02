
import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const page =async ()=>{

    const user = await currentUser();

    // defining the user 
    const userInfo ={};

    // defining the user data if the user is present  or just getting the data from the momgo db data base 

    const userData = {
        id:user?.id,
        objecttId: userInfo?._id,
        username:userInfo?.username||user?.username,
        name:userInfo?.name || user?.firstName ||"",
        bio: userInfo?.bio || "",
        image : userInfo?.image || user?.imageUrl,

    }

    return (
        
        <main className = "mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className=" head-text">onboarding</h1>
            <p className = "mt-3 text-base-regular text-light-2">
                to use the threads please complete your profile
            </p>
        <section className="mt-9 bg-dark-2 p-10">
            <AccountProfile user={userData} btnTitle = "Continue"/>
        </section>
        </main>
    
    )
   
}
export default page;