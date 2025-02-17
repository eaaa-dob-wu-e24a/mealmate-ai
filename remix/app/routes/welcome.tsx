import { Link } from "react-router";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";

const WelcomePage = () => {
  return (
    <div className="relative bg-cover section-wrapper h-screen flex flex-col  items-center justify-center bg-center bg-no-repeat bg-[url('/img/welcomehero.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col justify-center gap-4 h-full">
        <h1 className="text-white text-4xl font-bold">
          Welcome to Our Application!
        </h1>
        <p className="text-white text-2xl">Please choose an option:</p>
        <div className="flex flex-col gap-4 absolute bottom-4 w-full  ">
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Login
          </Link>
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
};

export default WelcomePage;
