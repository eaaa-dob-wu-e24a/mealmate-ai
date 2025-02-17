import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { z } from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { setSession } from "~/lib/auth.server";
import { cn } from "~/lib/utils";
import { login } from "~/queries/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  return { error };
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const submit = useSubmit();
  const { error } = useLoaderData<typeof loader>();

  return (
    <div className="relative bg-cover h-screen flex flex-col section-wrapper  items-center justify-center bg-center bg-no-repeat bg-[url('/img/loginhero.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col justify-center gap-4 h-full">
        <h1 className="text-white text-4xl font-bold">Login to your account</h1>
        <p className="text-white text-2xl">
          Enter your details below to login to your account
        </p>

        <div className="flex flex-col gap-4 absolute bottom-4 w-full  ">
          <Link to="/onboarding/1" className="text-white text-lg group">
            Not an user?{" "}
            <span className="font-bold group-hover:underline">Sign up</span>
          </Link>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <Form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => {
              submit(data, { method: "post" });
            })}
          >
            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const info = await login(email as string, password as string);

  if (info?.token) {
    return await setSession(info);
  }

  return redirect("/login?error=" + info?.error);
}
