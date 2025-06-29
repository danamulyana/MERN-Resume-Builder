import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { valideEmail } from "../../utils/helper";

interface LoginProps {
  setCurrentPage: (page: string) => void;
}

const Login = ({ setCurrentPage } : LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!valideEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if(!password) {
      setError("Password is required");
      return;
    }

    setError(null); // Reset error state

    try {
      // Perform login logic here
      // If successful, navigate to the desired page
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your credentials to log in.</p>
      <form onSubmit={handleLogin}>
        <Input 
          value={email}
          onChange={(target) => setEmail(target.value)}
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          value={password}
          onChange={(target) => setPassword(target.value)}
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">Log In</button>

        <p className="text-[13px] text-slate-800 mt-4">
          Don't have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("sign-up");
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login