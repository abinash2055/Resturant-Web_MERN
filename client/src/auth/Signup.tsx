import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  // State for input fields
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const {signup, loading} = useUserStore();


  // Handler for input field changes
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handler for form submission
  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Form validation
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

      await signup(input);

    // Simulate API call (replace with actual API logic)
    console.log("Signup Input:", input);
    setErrors({});
  };

  // Loading state for submission
  // const loading = false;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        {/* Title */}
        <div className="mb-4 text-center">
          <h1 className="font-bold text-2xl">Personal Signature</h1>
        </div>

        {/* Full Name Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your fullname"
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.fullname && (
              <span className="text-sm text-red-700">{errors.fullname}</span>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email address"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.email && (
              <span className="text-sm text-red-700">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.password && (
              <span className="text-sm text-red-700">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Contact Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.contact && (
              <span className="text-sm text-red-700">{errors.contact}</span>
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
              Signup
            </Button>
          )}
        </div>

        {/* Separator and Login Link */}
        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
