import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4 bg-white shadow-md border border-gray-200"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-700">
            Enter your email address to reset your password
          </p>
        </div>

        {/* Input Field */}
        <div className="relative w-full">
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email Address"
            className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Mail className="absolute inset-y-0 left-3 my-auto text-gray-600 pointer-events-none" />
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-orange hover:bg-hoverOrange">
            {" "}
            Send Reset Link
          </Button>
        )}

        {/* For lagin page  */}
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
