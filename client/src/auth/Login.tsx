import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userLoginSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

type LoginInputState = {
  email: string;
  password: string;
};

const Login = () => {
  // To manage input fields
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // To submit the form
  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // Form validation
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log(input);
  };

  // Loading state
  const loading = false;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 bg-white mx-4 shadow-sm"
      >
        {/* Title */}
        <div className="mb-4 text-center font-extrabold">
          <h1 className="font-extrabold text-2xl text-gray-800">
            Personal Signature
          </h1>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email address"
              className="pl-10 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.email && (
              <span className="text-sm text-red-700">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="pl-10 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.password && (
              <span className="text-sm text-red-700">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              Login
            </Button>
          )}

          {/* For Forgot Password  */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        {/* Separator */}
        <Separator />
        <p className="mt-2 text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
