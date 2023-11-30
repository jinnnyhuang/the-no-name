import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = ({ currentUser, handleLogin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login | 還沒有名字";
  }, []);

  useEffect(() => {
    // currentUser && navigate("/account");
    currentUser && navigate("/");
  }, [currentUser, navigate]);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
    // setError(null);
    event.target.id === error?.field && setError(null);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    // setError(null);
    event.target.id === error?.field && setError(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await handleLogin(email, password);
    // setError({ field: err?.field, message: err?.message || err });
    result.status !== 200 && setError({ field: result?.response?.data?.field, message: result?.response?.data?.message || result?.message });
  };

  const form = (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      <Input id="email" type="email" autoComplete="email" onChange={handleEmail}>
        E-mail
      </Input>
      <Input id="password" type="password" autoComplete="password" onChange={handlePassword}>
        Password
      </Input>
      {/* 
      <div className="pt-4">
        <label htmlFor="email" className="font-medium">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:shadow-outline"
          onChange={handleEmail}
        />
      </div>
      <div className="pt-4">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="password"
          className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:shadow-outline"
          onChange={handlePassword}
        />
      </div> */}
      <Button primary className="mt-8 normal-case rounded">
        Log in
      </Button>
    </form>
  );

  return (
    <div className="container m-auto">
      <div className="flex flex-col items-center caption-content">
        <div className="w-[20.5rem] md:w-[32rem]">
          <h1 className="caption">Welcome</h1>
          {form}
          <div className="mt-7 flex flex-col items-center gap-3.5">
            {error && <p className="text-red-400">{error.message}</p>}
            <p className="text-neutral-500">
              Don't have an account? &nbsp;
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign up.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
