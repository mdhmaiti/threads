

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;


// it is a dynamic thread page with their own respectable id.
async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  // if we have a params id then we also have a user who have gone throught the authentication process properly.
  // take the user from the clerk 
  const user = await currentUser();
  if (!user) return null;
// fetch the individual user using their id .
  const userInfo = await fetchUser(user.id);
  // if ytou cannot find the user info damm .. make your account properly. 
  if (!userInfo?.onboarded) redirect("/onboarding");

  // these thread are the post ,posted by the user
  const thread = await fetchThreadById(params.id); // fetch each thread by their id 

  return (
    <section className='relative'>
      <div>
        {/* these thread are the post data */}
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className='mt-7'>
        {/* params.is  note : the userInfo is from the database and the user is from the clerk*/}
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;