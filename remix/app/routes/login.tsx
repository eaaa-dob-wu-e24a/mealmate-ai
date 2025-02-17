import { Button, buttonVariants } from "~/components/ui/button";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
export default function Login() {
  return (
    <div className="relative bg-cover h-screen flex flex-col  items-center justify-center bg-center bg-no-repeat bg-[url('/img/loginhero.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col justify-center gap-4 h-full">
        <h1 className="text-white text-4xl font-bold">Login to your account</h1>
        <p className="text-white text-2xl">
          Enter your details below to login to your account
        </p>
        <div className="flex flex-col gap-4 absolute bottom-4 w-full  ">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Link
            to="/onboarding"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
