import { redirect, useNavigate } from "react-router";
import { login } from "../api/fetcher";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let reqBody = {
      email,
      password,
    };

    try {
      const res = await login("/api/v1/users/login", reqBody);
      if (res.status === "success") {
        console.log(res)
        const { role, token } = res;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "user") {
          navigate("/user-dashboard");
        } else if (role === "frontdesk") {
          navigate("/frontdesk-dashboard");
        } else {
          console.error("Unknown role:", role);
        }
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[30%] h-auto border flex flex-col gap-2 items-center justify-center p-4">
        <div className="w-full h-auto flex flex-col gap-2">
          <p>User Name</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="w-full border border-[#000] outline-none px-3"
          />
        </div>
        <div className="w-full h-auto flex flex-col gap-2">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border border-[#000] outline-none px-3"
          />
        </div>
        <button
          className="bg-[#3498DB] px-3 py-1 rounded-md text-[#fff]"
          onClick={handleLogin}
        >
          Login
        </button>
        <p>
          don't have an account? <span className="text-[#3498DB]">SignUp</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
