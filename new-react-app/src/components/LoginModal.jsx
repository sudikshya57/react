import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const LoginModal = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const { setShowUserLogin, setUser, axios, fetchUser } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(
  'http://localhost:4000/api/user/login',
  { email, password },
  { withCredentials: true }
);

      if (data.success) {
        setUser(data.user);
        await fetchUser();
        setShowUserLogin(false);
        navigate('/'); // Navigate to home on success
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="login-modal-title"
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p id="login-modal-title" className="text-2xl font-medium m-auto">
          <span className="text-[#8DA100]">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#8DA100]"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#8DA100]"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#8DA100]"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-[#8DA100] cursor-pointer font-medium"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-[#8DA100] cursor-pointer font-medium"
            >
              click here
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-[#8DA100] hover:bg-[#7C9100] transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
