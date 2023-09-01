"use client"
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Leftsidebar = () => {
  //defining
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          // if the link is currently active
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            // making the class name to do things dynamically ; temolate strings
            <Link
              href={link.route}
              key={link.label}
              className={ `leftsidebar ${isActive && 'bg-primary-500'}` } 
            >
              Link
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

        <div className="mt-10 px-6">
        <SignedIn>
            {/* when we sign out it will redirect back to the sign in  */}
            <SignOutButton signOutCallback={()=>router.push('/sign-in') }>
              <div className="flex cursor-pointer gap-4 p-4">
                
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  height={24}
                  width={24}
                />
                <p className="text-light-2 max-lg:hidden"></p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

    </section>
  );
};
export default Leftsidebar;
