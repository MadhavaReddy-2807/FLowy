"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "./(routes)/_components/logo";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Check if the user is logged in
  const godash = () => {
    router.push('/dashboard');
  }
  return (
    <div>
      <div className="flex justify-between px-5 py-2 border-2 shadow-lg">
        <Logo />
        <div className="flex gap-10">
          <Button className='mt-1 hidden md:block' onClick={() => { godash() }}>DashBoard</Button>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton>
              <Button variant="outline">Login</Button>
            </SignInButton>
          )}
        </div>
      </div>
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
        </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center my-auto ">{isSignedIn ? <Button onClick={() => { godash() }}>Get Started <ArrowRight /></Button> : <Button onClick={() => { godash() }}>Login <ArrowRight /></Button>}
        </div>
      </div>
        <footer className="w-full text-center text-sm text-gray-600 fixed bottom-0 ">
            Check the {" "}
            <a
              href="https://github.com/MadhavaReddy-2807/FLowy"  // <-- Replace with your actual repo URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              GitHub repository
            </a>{" "}
            to learn more about Flowly.
          </footer>
    </div>
  );
}
