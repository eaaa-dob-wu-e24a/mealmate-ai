import { Link } from "react-router";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";

const WelcomePage = () => {
  return (
    <div className="relative bg-cover h-full section-wrapper min-h-[calc(100svh-66px)] flex flex-col items-center justify-center bg-center bg-no-repeat bg-[url('/img/welcomehero.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="z-10 text-center items-center flex flex-col justify-evenly gap-4 h-full">
        <img
          src="/img/mascot-body.png"
          alt="Meal Mate Logo"
          className="w-40 h-40 object-contain"
        />
        <h1 className="text-white text-4xl font-bold">Welcome to Meal Mate</h1>
        <p className="text-white text-2xl">Please choose an option:</p>
        <div className=" w-full flex flex-col gap-4 bottom-4 left-4 right-4">
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "outline2", size: "lg" }))}
          >
            Login
          </Link>
          <Link
            to="/onboarding/1"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
