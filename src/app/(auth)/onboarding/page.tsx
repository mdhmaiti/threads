import { currentUser } from "@clerk/nextjs";
// sign up thhing generally gets the  user in fo in the middleware then pass the original thing .
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";


// it is to check if the user created their account profile or not 
// if it is already created then redirect the user to the home.

async function Page() {

  // the current user is actually present in the database of the clerk so we have to use promises sucvh as the async await .

  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings
  // it tells if the user info is alreay on the onboarded object which is a boolean and has its own id  , then redirect the user tio the home.
  const userInfo = await fetchUser(user.id);
  // collect the object of a specific user by the id /
  if (userInfo?.onboarded) redirect("/");
  //":" it is OR.   and the "??" means if the brfore all fails then return the right side thing .
  
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };
// with in the onboarding we need the account profile , which is like a resueable component of the form type . hence it is placed there.

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;