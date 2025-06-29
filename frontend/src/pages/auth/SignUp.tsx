import { useState } from "react";
import Input from "../../components/inputs/Input";
import { useNavigate } from "react-router-dom";
import { valideEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

interface SignUpProps {
  setCurrentPage: (page: string) => void;
}

const SignUp = ({ setCurrentPage }: SignUpProps) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profilePic) {
      setError("Profile picture is required");
      return;
    }

    if (!fullName) {
      setError("Full name is required");
      return;
    }

    if (!valideEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError(null); // Reset error state

    try {
      // Perform sign-up logic here
      // If successful, navigate to the desired page
      navigate("/dashboard");
    } catch (error) {
      setError("Sign-up failed");
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please fill in the details to sign up.</p>
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={(target) => setFullName(target.value)}
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
          />
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
        </div>
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">Sign Up</button>

        <p className="text-[13px] text-slate-800 mt-4">
          Already have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp