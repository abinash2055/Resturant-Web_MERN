import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
  // To get array of a string total 6
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const loading = false;

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    // To move to the next input field if a digit is entered
    if (value !== "" && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-400">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digits code sent to your email address
          </p>
        </div>
        <form>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => {
                  if (element) {
                    inputRef.current[idx] = element;
                  }
                }}
                type="text"
                maxLength={1}
                value={letter}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            ))}
          </div>

          {/* For Button  */}
          {loading ? (
            <Button
              disabled
              className="bg-orange hover:bg-hoverOrange mt-6 w-full"
            >
              <Loader2 className="mr-2 m-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">
              Verify Email
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
